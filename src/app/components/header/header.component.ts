import { Component, OnInit, OnDestroy, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../services/theme.service';
import { LanguageService, Language } from '../../services/language.service';
import { AnalyticsService } from '../../services/analytics.service';
import { VoiceCommandComponent } from '../voice-command/voice-command.component';
import { GSAPAnimations } from '../../utils/gsap.animations';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, VoiceCommandComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('languageMenu', { static: false }) languageMenu!: ElementRef;
  
  isDarkMode = false;
  isMenuOpen = false;
  isLanguageMenuOpen = false;
  activeRoute = '';
  currentLanguage: Language = 'en';
  supportedLanguages: Language[] = [];
  private subscriptions = new Subscription();

  navLinks = [
    { path: '', label: 'common.home', key: 'home' },
    { path: 'about', label: 'common.about', key: 'about' },
    { path: 'projects', label: 'common.projects', key: 'projects' },
    { path: 'resume', label: 'common.resume', key: 'resume' },
    { path: 'contact', label: 'common.contact', key: 'contact' }
  ];

  constructor(
    public themeService: ThemeService,
    public languageService: LanguageService,
    private translateService: TranslateService,
    private analyticsService: AnalyticsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to theme changes
    this.subscriptions.add(
      this.themeService.isDarkMode$.subscribe(isDark => {
        this.isDarkMode = isDark;
      })
    );

    // Subscribe to language changes
    this.subscriptions.add(
      this.languageService.currentLanguage$.subscribe(lang => {
        this.currentLanguage = lang;
      })
    );

    // Get supported languages
    this.supportedLanguages = this.languageService.getSupportedLanguages();
    this.currentLanguage = this.languageService.getCurrentLanguage();

    // Subscribe to route changes
    this.subscriptions.add(
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: any) => {
          this.activeRoute = event.urlAfterRedirects.split('/')[1] || '';
          this.isMenuOpen = false;
          this.isLanguageMenuOpen = false;
        })
    );

    // Animate header on load
    setTimeout(() => {
      GSAPAnimations.fadeIn('.header-nav', 0.2);
    }, 100);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    // Track theme toggle
    this.analyticsService.trackThemeToggle(this.isDarkMode ? 'dark' : 'light');
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleLanguageMenu(): void {
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.languageMenu && !this.languageMenu.nativeElement.contains(event.target)) {
      this.isLanguageMenuOpen = false;
    }
  }

  closeLanguageMenu(): void {
    this.isLanguageMenuOpen = false;
  }

  setLanguage(lang: Language): void {
    console.log('Setting language to:', lang);
    this.languageService.setLanguage(lang);
    this.isLanguageMenuOpen = false;
    // Track language change
    this.analyticsService.trackLanguageChange(lang);
  }

  getLanguageName(lang: Language): string {
    return this.languageService.getLanguageName(lang);
  }

  isActive(path: string): boolean {
    if (path === '') {
      return this.activeRoute === '';
    }
    return this.activeRoute === path;
  }
}

