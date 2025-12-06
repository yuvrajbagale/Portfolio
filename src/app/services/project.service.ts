import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PortfolioData, Project as PortfolioProject } from '../portfolio-data';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: Project[];

  constructor() {
    // Convert PortfolioData projects to service format
    this.projects = PortfolioData.projects.map((p: PortfolioProject) => ({
      id: p.id.toString(),
      title: p.name,
      description: p.description,
      longDescription: p.description + '. ' + p.features.join('. '),
      technologies: p.technologies,
      features: p.features,
      imageUrl: p.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      githubUrl: p.githubUrl,
      liveUrl: p.liveUrl,
      category: 'Portfolio' // You can add category to PortfolioProject interface if needed
    }));
  }

  getProjects(): Observable<Project[]> {
    return of(this.projects);
  }

  getProjectById(id: string): Observable<Project | undefined> {
    const project = this.projects.find(p => p.id === id);
    return of(project);
  }
}

