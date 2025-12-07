import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private measurementId: string = 'G-XXXXXXXXXX'; // Replace with your GA4 Measurement ID

  constructor(private router: Router) {
    this.setupPageViewTracking();
  }

  /**
   * Initialize Google Analytics
   * Call this method in app.component.ts ngOnInit
   */
  initialize(measurementId: string): void {
    this.measurementId = measurementId;
    this.loadGoogleAnalytics();
  }

  /**
   * Load Google Analytics script
   */
  private loadGoogleAnalytics(): void {
    // Check if gtag is already loaded
    if (typeof gtag !== 'undefined') {
      return;
    }

    // Load gtag.js script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
    document.head.appendChild(script1);

    // Initialize gtag
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${this.measurementId}', {
        page_path: window.location.pathname
      });
    `;
    document.head.appendChild(script2);
  }

  /**
   * Setup automatic page view tracking on route changes
   */
  private setupPageViewTracking(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.trackPageView(event.urlAfterRedirects);
      });
  }

  /**
   * Track page view
   */
  trackPageView(url: string): void {
    if (typeof gtag === 'undefined') {
      console.warn('Google Analytics not initialized');
      return;
    }

    gtag('config', this.measurementId, {
      page_path: url,
      page_title: document.title
    });

    console.log('Page view tracked:', url);
  }

  /**
   * Track custom event
   */
  trackEvent(
    eventName: string,
    eventCategory: string,
    eventLabel?: string,
    value?: number
  ): void {
    if (typeof gtag === 'undefined') {
      console.warn('Google Analytics not initialized');
      return;
    }

    gtag('event', eventName, {
      event_category: eventCategory,
      event_label: eventLabel,
      value: value
    });

    console.log('Event tracked:', eventName, eventCategory, eventLabel);
  }

  /**
   * Track button click
   */
  trackButtonClick(buttonName: string, location?: string): void {
    this.trackEvent('button_click', 'engagement', buttonName, undefined);
    
    if (location) {
      this.trackEvent('button_click_location', 'engagement', location, undefined);
    }
  }

  /**
   * Track form submission
   */
  trackFormSubmission(formName: string, formStatus: 'success' | 'error' = 'success'): void {
    this.trackEvent('form_submit', 'form', formName, undefined);
    this.trackEvent(`form_submit_${formStatus}`, 'form', formName, undefined);
  }

  /**
   * Track download
   */
  trackDownload(fileName: string, fileType: string): void {
    this.trackEvent('file_download', 'download', fileName, undefined);
    this.trackEvent('file_download_type', 'download', fileType, undefined);
  }

  /**
   * Track external link click
   */
  trackExternalLink(url: string, linkText?: string): void {
    this.trackEvent('external_link_click', 'outbound', url, undefined);
    
    if (linkText) {
      this.trackEvent('external_link_text', 'outbound', linkText, undefined);
    }
  }

  /**
   * Track social media click
   */
  trackSocialClick(platform: string, action: string = 'click'): void {
    this.trackEvent('social_click', 'social', platform, undefined);
    this.trackEvent(`social_${action}`, 'social', platform, undefined);
  }

  /**
   * Track theme toggle
   */
  trackThemeToggle(theme: 'light' | 'dark'): void {
    this.trackEvent('theme_toggle', 'preference', theme, undefined);
  }

  /**
   * Track language change
   */
  trackLanguageChange(language: string): void {
    this.trackEvent('language_change', 'preference', language, undefined);
  }

  /**
   * Track voice command
   */
  trackVoiceCommand(command: string, success: boolean): void {
    this.trackEvent('voice_command', 'voice', command, success ? 1 : 0);
  }

  /**
   * Track scroll depth
   */
  trackScrollDepth(depth: number): void {
    this.trackEvent('scroll_depth', 'engagement', `${depth}%`, depth);
  }

  /**
   * Track time on page
   */
  trackTimeOnPage(timeInSeconds: number): void {
    this.trackEvent('time_on_page', 'engagement', 'seconds', timeInSeconds);
  }

  /**
   * Track search (if you add search functionality)
   */
  trackSearch(searchTerm: string, resultsCount?: number): void {
    this.trackEvent('search', 'search', searchTerm, resultsCount);
  }

  /**
   * Set user properties
   */
  setUserProperty(propertyName: string, value: string): void {
    if (typeof gtag === 'undefined') {
      return;
    }

    gtag('set', 'user_properties', {
      [propertyName]: value
    });
  }

  /**
   * Set user ID (for logged-in users)
   */
  setUserId(userId: string): void {
    if (typeof gtag === 'undefined') {
      return;
    }

    gtag('config', this.measurementId, {
      user_id: userId
    });
  }
}

