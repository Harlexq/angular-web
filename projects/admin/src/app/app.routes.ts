import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthService } from '../../_Functionality/services/auth.service';

export const routes: Routes = [
  { path: 'dashboard', pathMatch: 'full', redirectTo: '/' },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup/signup.component').then((c) => c.SignupComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/pages.component').then((c) => c.PagesComponent),
    canActivateChild: [() => inject(AuthService).checkIsAuth()],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
      {
        path: 'blogs',
        loadComponent: () =>
          import('./pages/blogs/blogs.component').then((c) => c.BlogsComponent),
      },
      {
        path: 'new-blogs',
        loadComponent: () =>
          import('./pages/new-blogs/new-blogs.component').then(
            (c) => c.NewBlogsComponent
          ),
      },
      {
        path: 'update-blog/:id',
        loadComponent: () =>
          import('./pages/update-blog/update-blog.component').then(
            (c) => c.UpdateBlogComponent
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
      {
        path: '**',
        loadComponent: () =>
          import('./pages/not-found/not-found.component').then(
            (c) => c.NotFoundComponent
          ),
      },
    ],
  },
];
