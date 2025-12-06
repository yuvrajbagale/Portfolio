import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GSAPAnimations } from '../../utils/gsap.animations';
import { PortfolioData } from '../../portfolio-data';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit, AfterViewInit {
  // Portfolio data
  personalInfo = PortfolioData.personalInfo;
  summary = PortfolioData.summary;
  experiences = PortfolioData.experiences;
  education = PortfolioData.education;
  skills = PortfolioData.skills;
  certifications = PortfolioData.certifications;
  languages = PortfolioData.languages;

  // Format skills by category for display
  get skillsByCategory() {
    return {
      frontend: this.getSkillsByCategory(['Frontend Frameworks', 'Core Technologies', 'CSS Frameworks']),
      backend: this.getSkillsByCategory(['Backend & Database']),
      tools: this.getSkillsByCategory(['Tools & Platforms']),
      other: this.getSkillsByCategory(['Libraries', 'Data Visualization', 'Testing', 'Other'])
    };
  }

  private getSkillsByCategory(categories: string[]): string[] {
    return this.skills
      .filter(skill => categories.includes(skill.category))
      .flatMap(skill => skill.items);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      GSAPAnimations.fadeInUp('.resume-title', 0);
      GSAPAnimations.scrollReveal('.resume-section');
    }, 200);
  }

  downloadResume(): void {
    // In a real application, this would download a PDF file
    // For now, we'll create a simple text version
    const resumeText = this.generateResumeText();
    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.personalInfo.name.replace(' ', '_')}_Resume.txt`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  private generateResumeText(): string {
    return `
${this.personalInfo.name.toUpperCase()}
${this.personalInfo.title}

${this.personalInfo.email} | ${this.personalInfo.phone} | ${this.personalInfo.location}

SUMMARY
${this.summary}

EXPERIENCE
${this.experiences.map(exp => `
${exp.position} | ${exp.company} (${exp.startDate} - ${exp.endDate})
${exp.location}
${exp.responsibilities.map(r => `• ${r}`).join('\n')}
${exp.achievements && exp.achievements.length > 0 ? '\nAchievements:\n' + exp.achievements.map(a => `• ${a}`).join('\n') : ''}
Technologies: ${exp.technologies.join(', ')}
`).join('\n')}

SKILLS
${this.skills.map(skill => `${skill.category}: ${skill.items.join(', ')}`).join('\n')}

EDUCATION
${this.education.map(edu => `${edu.degree} - ${edu.institution} (${edu.year})`).join('\n')}

${this.certifications.length > 0 ? `CERTIFICATIONS\n${this.certifications.map(cert => `• ${cert.name} - ${cert.issuer}${cert.date ? ` (${cert.date})` : ''}`).join('\n')}\n` : ''}

${this.languages.length > 0 ? `LANGUAGES\n${this.languages.map(lang => `• ${lang.name} - ${lang.proficiency}`).join('\n')}` : ''}
    `.trim();
  }
}

