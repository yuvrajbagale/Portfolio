import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { GSAPAnimations } from '../../utils/gsap.animations';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isDarkMode = false;
  isMenuOpen = false;
  activeRoute = '';
  private subscriptions = new Subscription();

  navLinks = [
    { path: '', label: 'Home' },
    { path: 'about', label: 'About' },
    { path: 'projects', label: 'Projects' },
    { path: 'resume', label: 'Resume' },
    { path: 'contact', label: 'Contact' }
  ];

  constructor(
    public themeService: ThemeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.themeService.isDarkMode$.subscribe(isDark => {
        this.isDarkMode = isDark;
      })
    );

    this.subscriptions.add(
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: any) => {
          this.activeRoute = event.urlAfterRedirects.split('/')[1] || '';
          this.isMenuOpen = false;
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
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isActive(path: string): boolean {
    if (path === '') {
      return this.activeRoute === '';
    }
    return this.activeRoute === path;
  }
}

