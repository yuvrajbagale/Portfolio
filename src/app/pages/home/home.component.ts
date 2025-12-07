import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { GSAPAnimations } from '../../utils/gsap.animations';
import { gsap } from 'gsap';
import { PortfolioData } from '../../portfolio-data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('heroSection', { static: false }) heroSection!: ElementRef;
  @ViewChild('blob1', { static: false }) blob1!: ElementRef;
  @ViewChild('blob2', { static: false }) blob2!: ElementRef;
  @ViewChild('blob3', { static: false }) blob3!: ElementRef;

  // Portfolio data
  personalInfo = PortfolioData.personalInfo;
  summary = PortfolioData.summary;
  statistics = PortfolioData.statistics;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Animate hero text
    setTimeout(() => {
      GSAPAnimations.textReveal('.hero-title', 0);
      GSAPAnimations.fadeInUp('.hero-subtitle', 0.3);
      GSAPAnimations.fadeInUp('.hero-description', 0.5);
      GSAPAnimations.scaleIn('.hero-button', 0.7);
    }, 100);

    // Animate floating blobs
    if (this.blob1?.nativeElement) {
      GSAPAnimations.floating(this.blob1.nativeElement);
    }
    if (this.blob2?.nativeElement) {
      gsap.to(this.blob2.nativeElement, { delay: 1, y: -20, duration: 2.5, ease: 'power1.inOut', yoyo: true, repeat: -1 });
    }
    if (this.blob3?.nativeElement) {
      GSAPAnimations.rotateBlob(this.blob3.nativeElement);
    }
  }
}

