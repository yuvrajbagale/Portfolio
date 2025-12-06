import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    data: { animation: 'home' }
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    data: { animation: 'about' }
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent),
    data: { animation: 'projects' }
  },
  {
    path: 'projects/:id',
    loadComponent: () => import('./pages/project-detail/project-detail.component').then(m => m.ProjectDetailComponent),
    data: { animation: 'projectDetail' }
  },
  {
    path: 'resume',
    loadComponent: () => import('./pages/resume/resume.component').then(m => m.ResumeComponent),
    data: { animation: 'resume' }
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    data: { animation: 'contact' }
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

