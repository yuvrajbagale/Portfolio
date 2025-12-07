import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface VoiceCommand {
  command: string;
  action: () => void;
  description: string;
}

export type VoiceRecognitionStatus = 'idle' | 'listening' | 'processing' | 'error';

@Injectable({
  providedIn: 'root'
})
export class VoiceCommandService {
  private recognition: any;
  private isSupported = false;
  private statusSubject = new BehaviorSubject<VoiceRecognitionStatus>('idle');
  public status$: Observable<VoiceRecognitionStatus> = this.statusSubject.asObservable();

  private commands: Map<string, VoiceCommand> = new Map();
  private isListening = false;

  constructor(private router: Router) {
    this.initializeSpeechRecognition();
    this.setupCommands();
  }

  /**
   * Initialize Web Speech API
   */
  private initializeSpeechRecognition(): void {
    // Check for browser support
    const SpeechRecognition = (window as any).SpeechRecognition || 
                              (window as any).webkitSpeechRecognition ||
                              (window as any).mozSpeechRecognition ||
                              (window as any).msSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('Speech Recognition API not supported in this browser');
      this.isSupported = false;
      return;
    }

    this.isSupported = true;
    this.recognition = new SpeechRecognition();
    
    // Configure recognition settings
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-US'; // Can be changed based on current language

    // Event handlers
    this.recognition.onstart = () => {
      this.statusSubject.next('listening');
      this.isListening = true;
    };

    this.recognition.onresult = (event: any) => {
      this.handleRecognitionResult(event);
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      this.statusSubject.next('error');
      this.isListening = false;
      
      // Auto-recover from certain errors
      if (event.error === 'no-speech' || event.error === 'audio-capture') {
        setTimeout(() => {
          if (this.isListening) {
            this.statusSubject.next('idle');
          }
        }, 2000);
      }
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (this.statusSubject.value === 'listening') {
        this.statusSubject.next('idle');
      }
    };
  }

  /**
   * Setup voice commands
   */
  private setupCommands(): void {
    // Navigation commands
    this.addCommand({
      command: 'show projects',
      action: () => this.router.navigate(['/projects']),
      description: 'Navigate to projects page'
    });

    this.addCommand({
      command: 'go to projects',
      action: () => this.router.navigate(['/projects']),
      description: 'Navigate to projects page'
    });

    this.addCommand({
      command: 'contact me',
      action: () => this.router.navigate(['/contact']),
      description: 'Navigate to contact page'
    });

    this.addCommand({
      command: 'contact',
      action: () => this.router.navigate(['/contact']),
      description: 'Navigate to contact page'
    });

    this.addCommand({
      command: 'go to contact',
      action: () => this.router.navigate(['/contact']),
      description: 'Navigate to contact page'
    });

    this.addCommand({
      command: 'home',
      action: () => this.router.navigate(['/']),
      description: 'Navigate to home page'
    });

    this.addCommand({
      command: 'go home',
      action: () => this.router.navigate(['/']),
      description: 'Navigate to home page'
    });

    this.addCommand({
      command: 'about',
      action: () => this.router.navigate(['/about']),
      description: 'Navigate to about page'
    });

    this.addCommand({
      command: 'go to about',
      action: () => this.router.navigate(['/about']),
      description: 'Navigate to about page'
    });

    this.addCommand({
      command: 'show about',
      action: () => this.router.navigate(['/about']),
      description: 'Navigate to about page'
    });

    this.addCommand({
      command: 'resume',
      action: () => this.router.navigate(['/resume']),
      description: 'Navigate to resume page'
    });

    this.addCommand({
      command: 'show resume',
      action: () => this.router.navigate(['/resume']),
      description: 'Navigate to resume page'
    });

    this.addCommand({
      command: 'go to resume',
      action: () => this.router.navigate(['/resume']),
      description: 'Navigate to resume page'
    });
  }

  /**
   * Add a custom voice command
   */
  addCommand(voiceCommand: VoiceCommand): void {
    this.commands.set(voiceCommand.command.toLowerCase(), voiceCommand);
  }

  /**
   * Remove a voice command
   */
  removeCommand(command: string): void {
    this.commands.delete(command.toLowerCase());
  }

  /**
   * Get all available commands
   */
  getCommands(): VoiceCommand[] {
    return Array.from(this.commands.values());
  }

  /**
   * Check if speech recognition is supported
   */
  isSpeechRecognitionSupported(): boolean {
    return this.isSupported;
  }

  /**
   * Start listening for voice commands
   */
  startListening(): void {
    if (!this.isSupported) {
      console.warn('Speech Recognition not supported');
      alert('Voice commands are not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (this.isListening) {
      console.log('Already listening');
      return;
    }

    try {
      this.recognition.start();
    } catch (error) {
      console.error('Error starting recognition:', error);
      // If already started, stop and restart
      if (this.isListening) {
        this.stopListening();
        setTimeout(() => {
          this.recognition.start();
        }, 100);
      }
    }
  }

  /**
   * Stop listening for voice commands
   */
  stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
      this.statusSubject.next('idle');
    }
  }

  /**
   * Toggle listening state
   */
  toggleListening(): void {
    if (this.isListening) {
      this.stopListening();
    } else {
      this.startListening();
    }
  }

  /**
   * Handle recognition result
   */
  private handleRecognitionResult(event: any): void {
    this.statusSubject.next('processing');
    
    const transcript = event.results[0][0].transcript.toLowerCase().trim();
    console.log('Voice command received:', transcript);

    // Find matching command
    let matched = false;
    for (const [command, voiceCommand] of this.commands.entries()) {
      if (transcript.includes(command)) {
        console.log(`Executing command: ${command}`);
        voiceCommand.action();
        matched = true;
        break;
      }
    }

    if (!matched) {
      console.log('No matching command found for:', transcript);
      // You can add a visual feedback here for unrecognized commands
    }

    // Reset status after processing
    setTimeout(() => {
      this.statusSubject.next('idle');
    }, 500);
  }

  /**
   * Set recognition language
   */
  setLanguage(lang: string): void {
    if (this.recognition) {
      this.recognition.lang = lang;
    }
  }

  /**
   * Get current status
   */
  getStatus(): VoiceRecognitionStatus {
    return this.statusSubject.value;
  }
}

