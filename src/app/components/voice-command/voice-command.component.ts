import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoiceCommandService, VoiceRecognitionStatus } from '../../services/voice-command.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-voice-command',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voice-command.component.html',
  styleUrls: ['./voice-command.component.css']
})
export class VoiceCommandComponent implements OnInit, OnDestroy {
  status: VoiceRecognitionStatus = 'idle';
  isSupported = false;
  private subscriptions = new Subscription();

  constructor(public voiceCommandService: VoiceCommandService) {}

  ngOnInit(): void {
    this.isSupported = this.voiceCommandService.isSpeechRecognitionSupported();
    
    this.subscriptions.add(
      this.voiceCommandService.status$.subscribe(status => {
        this.status = status;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  toggleListening(): void {
    this.voiceCommandService.toggleListening();
  }

  getStatusIcon(): string {
    switch (this.status) {
      case 'listening':
        return '🎤';
      case 'processing':
        return '⚙️';
      case 'error':
        return '❌';
      default:
        return '🎙️';
    }
  }

  getStatusText(): string {
    switch (this.status) {
      case 'listening':
        return 'Listening...';
      case 'processing':
        return 'Processing...';
      case 'error':
        return 'Error occurred';
      default:
        return 'Voice Commands';
    }
  }

  getStatusColor(): string {
    switch (this.status) {
      case 'listening':
        return 'text-red-500 animate-pulse';
      case 'processing':
        return 'text-blue-500';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  }
}

