import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProjectService, Project } from '../../services/project.service';
import { GSAPAnimations } from '../../utils/gsap.animations';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit, AfterViewInit {
  project$: Observable<Project | undefined>;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {
    this.project$ = this.route.paramMap.pipe(
      map(params => params.get('id') || ''),
      switchMap(id => this.projectService.getProjectById(id))
    );
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      GSAPAnimations.fadeInUp('.project-detail-title', 0);
      GSAPAnimations.scrollReveal('.project-feature');
    }, 200);
  }
}

