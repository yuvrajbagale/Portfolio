import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs/operators';

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  private installPromptSubject = new BehaviorSubject<BeforeInstallPromptEvent | null>(null);
  public installPrompt$: Observable<BeforeInstallPromptEvent | null> = this.installPromptSubject.asObservable();

  private isInstalledSubject = new BehaviorSubject<boolean>(false);
  public isInstalled$: Observable<boolean> = this.isInstalledSubject.asObservable();

  private isOnlineSubject = new BehaviorSubject<boolean>(navigator.onLine);
  public isOnline$: Observable<boolean> = this.isOnlineSubject.asObservable();

  constructor(private swUpdate: SwUpdate) {
    this.checkInstallation();
    this.setupInstallPrompt();
    this.setupOnlineStatus();
    this.setupUpdateCheck();
  }

  /**
   * Check if app is already installed
   */
  private checkInstallation(): void {
    // Check if running in standalone mode (installed PWA)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                        (window.navigator as any).standalone ||
                        document.referrer.includes('android-app://');
    
    this.isInstalledSubject.next(isStandalone);
  }

  /**
   * Setup install prompt listener
   */
  private setupInstallPrompt(): void {
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault();
      this.installPromptSubject.next(e as BeforeInstallPromptEvent);
    });

    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      this.installPromptSubject.next(null);
      this.isInstalledSubject.next(true);
      console.log('PWA installed successfully');
    });
  }

  /**
   * Setup online/offline status monitoring
   */
  private setupOnlineStatus(): void {
    window.addEventListener('online', () => {
      this.isOnlineSubject.next(true);
      console.log('App is online');
    });

    window.addEventListener('offline', () => {
      this.isOnlineSubject.next(false);
      console.log('App is offline');
    });
  }

  /**
   * Setup service worker update checking
   */
  private setupUpdateCheck(): void {
    if (!this.swUpdate.isEnabled) {
      console.log('Service Worker is not enabled');
      return;
    }

    // Check for updates
    this.swUpdate.versionUpdates
      .pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY')
      )
      .subscribe(() => {
        console.log('New version available');
        // You can show a notification here
      });
  }

  /**
   * Prompt user to install the app
   */
  async promptInstall(): Promise<boolean> {
    const prompt = this.installPromptSubject.value;
    if (!prompt) {
      console.warn('Install prompt not available');
      return false;
    }

    try {
      await prompt.prompt();
      const choiceResult = await prompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
        this.installPromptSubject.next(null);
        return true;
      } else {
        console.log('User dismissed the install prompt');
        return false;
      }
    } catch (error) {
      console.error('Error showing install prompt:', error);
      return false;
    }
  }

  /**
   * Check if install prompt is available
   */
  isInstallPromptAvailable(): boolean {
    return this.installPromptSubject.value !== null;
  }

  /**
   * Check if app is installed
   */
  isAppInstalled(): boolean {
    return this.isInstalledSubject.value;
  }

  /**
   * Check if app is online
   */
  isAppOnline(): boolean {
    return this.isOnlineSubject.value;
  }

  /**
   * Update the app to the latest version
   */
  async updateApp(): Promise<void> {
    if (!this.swUpdate.isEnabled) {
      console.warn('Service Worker is not enabled');
      return;
    }

    try {
      const updateAvailable = await this.swUpdate.checkForUpdate();
      if (updateAvailable) {
        await this.swUpdate.activateUpdate();
        window.location.reload();
      } else {
        console.log('App is up to date');
      }
    } catch (error) {
      console.error('Error updating app:', error);
    }
  }

  /**
   * Get current install prompt
   */
  getInstallPrompt(): BeforeInstallPromptEvent | null {
    return this.installPromptSubject.value;
  }
}

