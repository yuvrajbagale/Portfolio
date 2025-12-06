// portfolio-data.ts
// Common data file for portfolio - All information in one place

export interface PersonalInfo {
    name: string;
    title: string;
    tagline: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github?: string;
    portfolio?: string;
  }
  
  export interface Education {
    degree: string;
    institution: string;
    duration: string;
    year: string;
    field?: string;
  }
  
  export interface Experience {
    id: number;
    company: string;
    position: string;
    duration: string;
    startDate: string;
    endDate: string;
    location: string;
    responsibilities: string[];
    technologies: string[];
    achievements?: string[];
  }
  
  export interface Skill {
    category: string;
    items: string[];
    proficiency?: number; // 1-100
  }
  
  export interface Certification {
    name: string;
    issuer: string;
    date?: string;
    credentialId?: string;
  }
  
  export interface Project {
    id: number;
    name: string;
    description: string;
    technologies: string[];
    features: string[];
    liveUrl?: string;
    githubUrl?: string;
    image?: string;
  }
  
  export interface Language {
    name: string;
    proficiency: 'Native' | 'Fluent' | 'Intermediate' | 'Basic';
  }
  
  export interface SocialLinks {
    linkedin?: string;
    github?: string;
    twitter?: string;
    portfolio?: string;
    email?: string;
  }
  
  // ==================== MAIN PORTFOLIO DATA ====================
  
  export class PortfolioData {
    
    // Personal Information
    static readonly personalInfo: PersonalInfo = {
      name: 'Yuvraj Bagale',
      title: 'Frontend Developer',
      tagline: 'Reacting with Design, Angular with Passion, Python with Logic | Creative Web Dev',
      email: 'yuvrajbagale123@gmail.com',
      phone: '9763854125',
      location: 'Pune, Maharashtra, India',
      linkedin: 'https://www.linkedin.com/in/yuvraj-bagale',
      github: 'https://github.com/yuvrajbagale', // Add your GitHub
      portfolio: 'https://yuvrajbagale.com' // Add your portfolio URL
    };
  
    // Professional Summary
    static readonly summary: string = 
      'Passionate Software Engineer with 3+ years of experience in crafting innovative solutions using HTML5, CSS3, and JavaScript. Specialized in building responsive user interfaces, cross-browser platforms, and large-scale web applications. Proficient in Agile methodology, GIT for version control, and Jira for defect tracking. Excited about leveraging technology to solve real-world challenges.';
  
    // Work Experience
    static readonly experiences: Experience[] = [
      {
        id: 1,
        company: 'Innspark',
        position: 'Frontend Developer',
        duration: '1 year 5 months',
        startDate: 'August 2024',
        endDate: 'Present',
        location: 'Pune, Maharashtra, India',
        responsibilities: [
          'Architected and developed responsive web applications using HTML5, CSS3, JavaScript, React, and Angular',
          'Collaborated with cross-functional teams in Agile sprints to deliver high-quality features',
          'Implemented modern UI/UX designs ensuring cross-browser compatibility',
          'Optimized application performance through code splitting and lazy loading',
          'Mentored junior developers on best coding practices and code reviews'
        ],
        technologies: ['Angular', 'React', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Git', 'Jira'],
        achievements: [
          'Improved application performance by 40%',
          'Reduced load times through implementation of best practices',
          'Successfully delivered 10+ projects on time'
        ]
      },
      {
        id: 2,
        company: 'Aptara',
        position: 'Software Developer',
        duration: '4 years 5 months',
        startDate: 'March 2020',
        endDate: 'July 2024',
        location: 'Pune, Maharashtra, India',
        responsibilities: [
          'Developed and maintained large-scale web applications serving thousands of users',
          'Integrated interactive data visualizations using amCharts library',
          'Built reusable component libraries and design systems',
          'Collaborated with backend teams to design and consume RESTful APIs',
          'Participated in code reviews, testing, and debugging processes',
          'Successfully migrated legacy applications to modern frameworks'
        ],
        technologies: ['React', 'Angular', 'jQuery', 'JavaScript', 'HTML5', 'CSS3', 'amCharts', 'RESTful APIs'],
        achievements: [
          'Reduced development time by 30% through reusable components',
          'Improved code quality and reduced production bugs',
          'Led migration of 5+ legacy applications to modern tech stack'
        ]
      }
    ];
  
    // Technical Skills
    static readonly skills: Skill[] = [
      {
        category: 'Frontend Frameworks',
        items: ['React', 'Angular', 'Vue.js'],
        proficiency: 90
      },
      {
        category: 'Core Technologies',
        items: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript'],
        proficiency: 95
      },
      {
        category: 'CSS Frameworks',
        items: ['Bootstrap', 'Tailwind CSS', 'Material-UI', 'Sass/SCSS'],
        proficiency: 85
      },
      {
        category: 'Libraries',
        items: ['jQuery', 'Redux', 'RxJS', 'Axios'],
        proficiency: 80
      },
      {
        category: 'Data Visualization',
        items: ['amCharts', 'D3.js', 'Chart.js', 'Recharts'],
        proficiency: 85
      },
      {
        category: 'Backend & Database',
        items: ['Python', 'Node.js', 'Express', 'MongoDB', 'MySQL'],
        proficiency: 70
      },
      {
        category: 'Tools & Platforms',
        items: ['Git', 'GitHub', 'GitLab', 'Jira', 'Webpack', 'npm', 'VS Code'],
        proficiency: 90
      },
      {
        category: 'Testing',
        items: ['Jest', 'Jasmine', 'Karma', 'Cypress'],
        proficiency: 75
      },
      {
        category: 'Other',
        items: ['RESTful APIs', 'Responsive Design', 'Cross-Browser Development', 'Agile/Scrum', 'UI/UX Design'],
        proficiency: 85
      }
    ];
  
    // Education
    static readonly education: Education[] = [
      {
        degree: 'Bachelor of Computer Science',
        institution: 'Pune University',
        duration: '4 years',
        year: '2012 - 2016',
        field: 'Computer Science'
      },
      {
        degree: 'Higher Secondary School Certificate',
        institution: 'Maharashtra State Board (MSBSHSE)',
        duration: '2 years',
        year: '2010 - 2012',
        field: 'Science'
      },
      {
        degree: 'Secondary School Certificate',
        institution: 'Maharashtra State Board (MSBSHSE)',
        duration: '10 years',
        year: '2000 - 2010',
        field: 'General'
      }
    ];
  
    // Certifications
    static readonly certifications: Certification[] = [
      {
        name: 'Complete JavaScript, jQuery and React Bootcamp - Hands-On',
        issuer: 'Online Platform',
        date: '2020'
      }
    ];
  
    // Languages
    static readonly languages: Language[] = [
      {
        name: 'Hindi',
        proficiency: 'Native'
      },
      {
        name: 'English',
        proficiency: 'Fluent'
      },
      {
        name: 'Marathi',
        proficiency: 'Native'
      }
    ];
  
    // Sample Projects (Add your real projects)
    static readonly projects: Project[] = [
      {
        id: 1,
        name: 'Interactive Dashboard',
        description: 'Built a comprehensive analytics dashboard with real-time data visualization using amCharts and Angular',
        technologies: ['Angular', 'TypeScript', 'amCharts', 'RxJS', 'Material-UI'],
        features: [
          'Real-time data updates',
          'Interactive charts and graphs',
          'Responsive design',
          'Export to PDF/Excel functionality'
        ],
        liveUrl: 'https://example.com/dashboard',
        githubUrl: 'https://github.com/yuvrajbagale/dashboard'
      },
      {
        id: 2,
        name: 'E-commerce Platform',
        description: 'Developed a full-featured e-commerce platform with shopping cart, payment integration, and admin panel',
        technologies: ['React', 'Redux', 'Node.js', 'MongoDB', 'Stripe'],
        features: [
          'Product catalog with search and filters',
          'Shopping cart and checkout',
          'Payment gateway integration',
          'Order tracking system',
          'Admin dashboard'
        ],
        liveUrl: 'https://example.com/ecommerce',
        githubUrl: 'https://github.com/yuvrajbagale/ecommerce'
      },
      {
        id: 3,
        name: 'Portfolio Website',
        description: 'Personal portfolio website showcasing projects and skills with modern design',
        technologies: ['Angular', 'TypeScript', 'SCSS', 'Bootstrap'],
        features: [
          'Responsive design',
          'Smooth animations',
          'Project showcase',
          'Contact form',
          'Blog section'
        ],
        liveUrl: 'https://yuvrajbagale.com',
        githubUrl: 'https://github.com/yuvrajbagale/portfolio'
      }
    ];
  
    // Social Links
    static readonly socialLinks: SocialLinks = {
      linkedin: 'https://www.linkedin.com/in/yuvraj-bagale',
      github: 'https://github.com/yuvrajbagale',
      email: 'mailto:yuvrajbagale123@gmail.com',
      portfolio: 'https://yuvrajbagale.com'
    };
  
    // Contact Information
    static readonly contactInfo = {
      email: 'yuvrajbagale123@gmail.com',
      phone: '+91 9763854125',
      location: 'Pune, Maharashtra, India',
      availability: 'Available for freelance and full-time opportunities'
    };
  
    // Statistics (for about section)
    static readonly statistics = {
      yearsOfExperience: 3,
      projectsCompleted: 25,
      clientsSatisfied: 15,
      technologies: 20
    };
  
    // Interests/Hobbies
    static readonly interests: string[] = [
      'Web Development',
      'UI/UX Design',
      'Open Source Contribution',
      'Tech Blogging',
      'Learning New Technologies'
    ];
  
    // ==================== HELPER METHODS ====================
  
    // Get all skills as flat array
    static getAllSkills(): string[] {
      return this.skills.flatMap(skill => skill.items);
    }
  
    // Get skills by category
    static getSkillsByCategory(category: string): string[] {
      const skill = this.skills.find(s => s.category === category);
      return skill ? skill.items : [];
    }
  
    // Get total years of experience
    static getTotalExperience(): number {
      return this.statistics.yearsOfExperience;
    }
  
    // Get current position
    static getCurrentPosition(): Experience | undefined {
      return this.experiences.find(exp => exp.endDate === 'Present');
    }
  
    // Get all technologies used
    static getAllTechnologies(): string[] {
      const techs = new Set<string>();
      this.experiences.forEach(exp => {
        exp.technologies.forEach(tech => techs.add(tech));
      });
      this.projects.forEach(project => {
        project.technologies.forEach(tech => techs.add(tech));
      });
      return Array.from(techs);
    }
  
    // Get featured projects (first 3)
    static getFeaturedProjects(): Project[] {
      return this.projects.slice(0, 3);
    }
  
    // Get recent experience (first 2)
    static getRecentExperience(): Experience[] {
      return this.experiences.slice(0, 2);
    }
  
    // Get contact details
    static getContactDetails() {
      return {
        ...this.contactInfo,
        social: this.socialLinks
      };
    }
  }
  
  // Export individual items for convenience
  export const {
    personalInfo,
    summary,
    experiences,
    skills,
    education,
    certifications,
    languages,
    projects,
    socialLinks,
    contactInfo,
    statistics,
    interests
  } = PortfolioData;