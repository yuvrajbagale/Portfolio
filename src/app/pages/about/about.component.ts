import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GSAPAnimations } from '../../utils/gsap.animations';
import { PortfolioData, Skill, Experience } from '../../portfolio-data';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, AfterViewInit {
  // Portfolio data
  personalInfo = PortfolioData.personalInfo;
  summary = PortfolioData.summary;
  skills: Skill[] = PortfolioData.skills;
  experiences: Experience[] = PortfolioData.experiences;

  // Flatten skills for display with individual levels
  get flattenedSkills() {
    const flattened: Array<{ name: string; level: number; category: string }> = [];
    this.skills.forEach(skill => {
      skill.items.forEach(item => {
        flattened.push({
          name: item,
          level: skill.proficiency || 85,
          category: skill.category
        });
      });
    });
    return flattened;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      GSAPAnimations.fadeInUp('.about-title', 0);
      GSAPAnimations.scrollReveal('.skill-item');
      GSAPAnimations.scrollReveal('.timeline-item');
      GSAPAnimations.scaleIn('.profile-card', 0.3);
    }, 200);
  }
}

