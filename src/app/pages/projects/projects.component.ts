import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectService, Project } from '../../services/project.service';
import { GSAPAnimations } from '../../utils/gsap.animations';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  projects$: Observable<Project[]>;

  constructor(private projectService: ProjectService) {
    this.projects$ = this.projectService.getProjects();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      GSAPAnimations.fadeInUp('.projects-title', 0);
      GSAPAnimations.staggerFadeIn('.project-card', 0.2);
    }, 200);
  }
}

