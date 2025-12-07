import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SpiderWebCursorComponent } from './components/spider-web-cursor/spider-web-cursor.component';
import { PwaInstallComponent } from './components/pwa-install/pwa-install.component';
import { ThemeService } from './services/theme.service';
import { VoiceCommandService } from './services/voice-command.service';
import { LanguageService } from './services/language.service';
import { routeAnimations } from './animations/route.animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TranslateModule, HeaderComponent, FooterComponent, SpiderWebCursorComponent, PwaInstallComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit {
  title = 'Yuvraj Bagale - Portfolio';

  constructor(
    private themeService: ThemeService,
    private translateService: TranslateService,
    private voiceCommandService: VoiceCommandService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.themeService.initTheme();
    // Language initialization is handled by LanguageService
    // Just ensure default language is set
    this.translateService.setDefaultLang('en');
    
    // Sync voice command language with app language
    this.languageService.currentLanguage$.subscribe(lang => {
      // Map language codes to speech recognition language codes
      const langMap: Record<string, string> = {
        'en': 'en-US',
        'hi': 'hi-IN',
        'mr': 'mr-IN'
      };
      this.voiceCommandService.setLanguage(langMap[lang] || 'en-US');
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}

