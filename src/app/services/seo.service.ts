import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  siteName?: string;
  twitterCard?: string;
  twitterSite?: string;
  twitterCreator?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly defaultImage = '/assets/images/og-image.jpg';
  private readonly siteName = 'Yuvraj Bagale - Portfolio';
  private readonly baseUrl = 'https://yuvrajbagale.com';

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router
  ) {
    this.setupRouteListener();
  }

  /**
   * Setup route change listener to update meta tags
   */
  private setupRouteListener(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Update canonical URL on route change
        this.updateCanonicalUrl();
      });
  }

  /**
   * Set comprehensive SEO meta tags
   */
  setSEOData(data: SEOData): void {
    const {
      title,
      description,
      keywords,
      image = this.defaultImage,
      url,
      type = 'website',
      author = 'Yuvraj Bagale',
      siteName = this.siteName,
      twitterCard = 'summary_large_image',
      twitterSite = '@yuvrajbagale',
      twitterCreator = '@yuvrajbagale'
    } = data;

    // Set page title
    if (title) {
      const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
      this.title.setTitle(fullTitle);
    }

    // Basic meta tags
    this.updateTag('description', description || '');
    this.updateTag('keywords', keywords || '');
    this.updateTag('author', author);

    // Open Graph tags
    this.updateOGTag('og:title', title || siteName);
    this.updateOGTag('og:description', description || '');
    this.updateOGTag('og:image', this.getFullUrl(image));
    this.updateOGTag('og:url', url || this.getFullUrl(this.router.url));
    this.updateOGTag('og:type', type);
    this.updateOGTag('og:site_name', siteName);

    // Twitter Card tags
    this.updateTag('twitter:card', twitterCard);
    this.updateTag('twitter:title', title || siteName);
    this.updateTag('twitter:description', description || '');
    this.updateTag('twitter:image', this.getFullUrl(image));
    this.updateTag('twitter:site', twitterSite);
    this.updateTag('twitter:creator', twitterCreator);

    // Additional meta tags
    this.updateTag('robots', 'index, follow');
    this.updateTag('googlebot', 'index, follow');
  }

  /**
   * Update or create a meta tag
   */
  private updateTag(name: string, content: string): void {
    if (content) {
      this.meta.updateTag({ name, content });
    }
  }

  /**
   * Update or create an Open Graph meta tag
   */
  private updateOGTag(property: string, content: string): void {
    if (content) {
      this.meta.updateTag({ property, content });
    }
  }

  /**
   * Update canonical URL
   */
  private updateCanonicalUrl(): void {
    const url = this.getFullUrl(this.router.url);
    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    
    link.setAttribute('href', url);
  }

  /**
   * Get full URL from relative path
   */
  private getFullUrl(path: string): string {
    if (path.startsWith('http')) {
      return path;
    }
    return `${this.baseUrl}${path.startsWith('/') ? path : '/' + path}`;
  }

  /**
   * Set structured data (JSON-LD)
   */
  setStructuredData(data: any): void {
    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }

  /**
   * Set Person structured data
   */
  setPersonStructuredData(personData: {
    name: string;
    jobTitle: string;
    description: string;
    email: string;
    url: string;
    image?: string;
    sameAs?: string[];
  }): void {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: personData.name,
      jobTitle: personData.jobTitle,
      description: personData.description,
      email: personData.email,
      url: personData.url,
      image: personData.image || this.getFullUrl(this.defaultImage),
      sameAs: personData.sameAs || []
    };

    this.setStructuredData(structuredData);
  }

  /**
   * Set Website structured data
   */
  setWebsiteStructuredData(websiteData: {
    name: string;
    description: string;
    url: string;
  }): void {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: websiteData.name,
      description: websiteData.description,
      url: websiteData.url,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${websiteData.url}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    };

    this.setStructuredData(structuredData);
  }

  /**
   * Set BreadcrumbList structured data
   */
  setBreadcrumbStructuredData(items: Array<{ name: string; url: string }>): void {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: this.getFullUrl(item.url)
      }))
    };

    this.setStructuredData(structuredData);
  }

  /**
   * Set Article structured data (for blog posts)
   */
  setArticleStructuredData(articleData: {
    headline: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified?: string;
    author: string;
    publisher: string;
  }): void {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: articleData.headline,
      description: articleData.description,
      image: this.getFullUrl(articleData.image),
      datePublished: articleData.datePublished,
      dateModified: articleData.dateModified || articleData.datePublished,
      author: {
        '@type': 'Person',
        name: articleData.author
      },
      publisher: {
        '@type': 'Organization',
        name: articleData.publisher,
        logo: {
          '@type': 'ImageObject',
          url: this.getFullUrl('/assets/images/logo.png')
        }
      }
    };

    this.setStructuredData(structuredData);
  }
}

