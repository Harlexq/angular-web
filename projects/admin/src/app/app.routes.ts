import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'dashboard', pathMatch: 'full', redirectTo: '/' },
  {
    path: '',
    loadComponent: () =>
      import('./pages/pages.component').then((c) => c.PagesComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((c) => c.LoginComponent),
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
