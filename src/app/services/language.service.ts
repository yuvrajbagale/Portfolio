import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

export type Language = 'en' | 'hi' | 'mr';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<Language>('en');
  public currentLanguage$: Observable<Language> = this.currentLanguageSubject.asObservable();

  private readonly supportedLanguages: Language[] = ['en', 'hi', 'mr'];
  private readonly languageNames: Record<Language, string> = {
    en: 'English',
    hi: 'हिंदी',
    mr: 'मराठी'
  };

  constructor(private translateService: TranslateService) {
    // Initialize language after a short delay to ensure TranslateService is ready
    setTimeout(() => {
      this.initLanguage();
    }, 0);
  }

  /**
   * Initialize language from localStorage or browser preference
   */
  private initLanguage(): void {
    const savedLang = localStorage.getItem('language') as Language | null;
    const browserLang = navigator.language.split('-')[0] as Language;
    
    let defaultLang: Language = 'en';
    
    if (savedLang && this.supportedLanguages.includes(savedLang)) {
      defaultLang = savedLang;
    } else if (this.supportedLanguages.includes(browserLang)) {
      defaultLang = browserLang;
    }
    
    // Ensure default language is set
    this.translateService.setDefaultLang('en');
    
    // Set the language
    this.setLanguage(defaultLang, false);
  }

  /**
   * Get current language
   */
  getCurrentLanguage(): Language {
    return this.currentLanguageSubject.value;
  }

  /**
   * Get all supported languages
   */
  getSupportedLanguages(): Language[] {
    return [...this.supportedLanguages];
  }

  /**
   * Get language display name
   */
  getLanguageName(lang: Language): string {
    return this.languageNames[lang];
  }

  /**
   * Set language
   * @param lang - Language code to set
   * @param save - Whether to save to localStorage (default: true)
   */
  setLanguage(lang: Language, save: boolean = true): void {
    if (!this.supportedLanguages.includes(lang)) {
      console.warn(`Language ${lang} is not supported`);
      return;
    }

    // Update BehaviorSubject first
    this.currentLanguageSubject.next(lang);
    
    // Use TranslateService to change language
    this.translateService.use(lang).subscribe({
      next: () => {
        console.log(`Language changed to: ${lang}`);
      },
      error: (err) => {
        console.error('Error loading translation:', err);
      }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Save to localStorage
    if (save) {
      localStorage.setItem('language', lang);
    }
  }

  /**
   * Toggle between languages (cycles through supported languages)
   */
  toggleLanguage(): void {
    const currentIndex = this.supportedLanguages.indexOf(this.currentLanguageSubject.value);
    const nextIndex = (currentIndex + 1) % this.supportedLanguages.length;
    this.setLanguage(this.supportedLanguages[nextIndex]);
  }
}

