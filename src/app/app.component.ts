import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SpiderWebCursorComponent } from './components/spider-web-cursor/spider-web-cursor.component';
import { ThreeBackgroundComponent } from './components/three-background/three-background.component';
import { PwaInstallComponent } from './components/pwa-install/pwa-install.component';
import { ThemeService } from './services/theme.service';
import { VoiceCommandService } from './services/voice-command.service';
import { LanguageService } from './services/language.service';
import { SeoService } from './services/seo.service';
import { AnalyticsService } from './services/analytics.service';
import { PortfolioData } from './portfolio-data';
import { filter } from 'rxjs/operators';
import { routeAnimations } from './animations/route.animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TranslateModule, HeaderComponent, FooterComponent, SpiderWebCursorComponent, ThreeBackgroundComponent, PwaInstallComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit {
  title = 'Yuvraj Bagale - Portfolio';
  // Color for 3D elements (0x0ea5e9 in decimal = 9465321)
  threeColor = 9465321;

  constructor(
    private themeService: ThemeService,
    private translateService: TranslateService,
    private voiceCommandService: VoiceCommandService,
    private languageService: LanguageService,
    private seoService: SeoService,
    private analyticsService: AnalyticsService,
    private router: Router
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

    // Initialize SEO
    this.initializeSEO();
    this.setupRouteBasedSEO();

    // Initialize Google Analytics
    // Replace 'G-XXXXXXXXXX' with your actual Google Analytics Measurement ID
    const gaMeasurementId = 'G-XXXXXXXXXX'; // Get this from Google Analytics
    if (gaMeasurementId && gaMeasurementId !== 'G-XXXXXXXXXX') {
      this.analyticsService.initialize(gaMeasurementId);
    }
  }

  /**
   * Initialize default SEO data
   */
  private initializeSEO(): void {
    const personalInfo = PortfolioData.personalInfo;
    
    // Set default SEO meta tags
    this.seoService.setSEOData({
      title: 'Yuvraj Bagale - Frontend Developer Portfolio',
      description: 'Frontend Developer with 3+ years of experience in Angular, React, and modern web development. Specialized in building responsive user interfaces and large-scale web applications.',
      keywords: 'Frontend Developer, Angular Developer, React Developer, Web Developer, TypeScript, JavaScript, Portfolio, Yuvraj Bagale, Pune, India',
      image: '/assets/images/og-image.jpg',
      url: 'https://yuvrajbagale.com/',
      type: 'website',
      author: personalInfo.name
    });

    // Set Person structured data
    this.seoService.setPersonStructuredData({
      name: personalInfo.name,
      jobTitle: personalInfo.title,
      description: PortfolioData.summary,
      email: personalInfo.email,
      url: 'https://yuvrajbagale.com',
      sameAs: [
        personalInfo.linkedin,
        personalInfo.github || '',
        personalInfo.portfolio || ''
      ].filter(Boolean)
    });

    // Set Website structured data
    this.seoService.setWebsiteStructuredData({
      name: 'Yuvraj Bagale - Portfolio',
      description: 'Frontend Developer Portfolio showcasing projects, skills, and experience',
      url: 'https://yuvrajbagale.com'
    });
  }

  /**
   * Setup route-based SEO updates
   */
  private setupRouteBasedSEO(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects;
        this.updateSEOForRoute(url);
      });
  }

  /**
   * Update SEO based on current route
   */
  private updateSEOForRoute(url: string): void {
    const route = url.split('/')[1] || 'home';
    
    const seoData: Record<string, any> = {
      home: {
        title: 'Yuvraj Bagale - Frontend Developer Portfolio',
        description: 'Frontend Developer with 3+ years of experience in Angular, React, and modern web development. Specialized in building responsive user interfaces and large-scale web applications.',
        keywords: 'Frontend Developer, Angular Developer, React Developer, Web Developer, TypeScript, JavaScript, Portfolio'
      },
      about: {
        title: 'About Me - Yuvraj Bagale',
        description: 'Learn about Yuvraj Bagale, a passionate Frontend Developer with expertise in Angular, React, and modern web technologies. 3+ years of experience in building innovative web solutions.',
        keywords: 'About Yuvraj Bagale, Frontend Developer, Web Developer Experience, Skills, Angular, React'
      },
      projects: {
        title: 'Projects - Yuvraj Bagale Portfolio',
        description: 'Explore my portfolio of web development projects built with Angular, React, and modern technologies. Interactive dashboards, e-commerce platforms, and more.',
        keywords: 'Web Development Projects, Angular Projects, React Projects, Portfolio Projects, Web Applications'
      },
      resume: {
        title: 'Resume - Yuvraj Bagale',
        description: 'View the complete resume of Yuvraj Bagale - Frontend Developer with experience in Angular, React, TypeScript, and modern web development technologies.',
        keywords: 'Resume, CV, Frontend Developer Resume, Yuvraj Bagale Resume, Web Developer CV'
      },
      contact: {
        title: 'Contact - Yuvraj Bagale',
        description: 'Get in touch with Yuvraj Bagale for freelance projects, job opportunities, or collaborations. Available for frontend development projects.',
        keywords: 'Contact Yuvraj Bagale, Hire Frontend Developer, Web Developer Contact, Freelance Developer'
      }
    };

    const data = seoData[route] || seoData['home'];
    this.seoService.setSEOData({
      ...data,
      url: `https://yuvrajbagale.com${url}`,
      image: '/assets/images/og-image.jpg'
    });

    // Update breadcrumbs
    if (route !== 'home') {
      const breadcrumbs = [
        { name: 'Home', url: '/' },
        { name: data.title.split(' - ')[0], url }
      ];
      this.seoService.setBreadcrumbStructuredData(breadcrumbs);
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}

