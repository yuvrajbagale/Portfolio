import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GSAPAnimations } from '../../utils/gsap.animations';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();

  socialLinks = [
    { name: 'GitHub', icon: 'github', url: 'https://github.com' },
    { name: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com' },
    { name: 'Twitter', icon: 'twitter', url: 'https://twitter.com' },
    { name: 'Email', icon: 'mail', url: 'mailto:yuvraj@example.com' }
  ];

  ngOnInit(): void {
    setTimeout(() => {
      GSAPAnimations.fadeIn('.footer-content', 0.3);
    }, 200);
  }
}

