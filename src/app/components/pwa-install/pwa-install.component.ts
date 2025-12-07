import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PwaService } from '../../services/pwa.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pwa-install',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pwa-install.component.html',
  styleUrls: ['./pwa-install.component.css']
})
export class PwaInstallComponent implements OnInit, OnDestroy {
  showInstallPrompt = false;
  isInstalled = false;
  isOnline = true;
  private subscriptions = new Subscription();

  constructor(public pwaService: PwaService) {}

  ngOnInit(): void {
    // Check if install prompt is available
    this.subscriptions.add(
      this.pwaService.installPrompt$.subscribe(prompt => {
        this.showInstallPrompt = prompt !== null;
      })
    );

    // Check if app is installed
    this.subscriptions.add(
      this.pwaService.isInstalled$.subscribe(installed => {
        this.isInstalled = installed;
      })
    );

    // Check online status
    this.subscriptions.add(
      this.pwaService.isOnline$.subscribe(online => {
        this.isOnline = online;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  async installApp(): Promise<void> {
    const installed = await this.pwaService.promptInstall();
    if (installed) {
      this.showInstallPrompt = false;
    }
  }

  dismissPrompt(): void {
    this.showInstallPrompt = false;
  }
}

