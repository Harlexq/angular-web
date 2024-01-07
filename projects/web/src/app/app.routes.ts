import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'index', redirectTo: '/', pathMatch: 'full' },
  { path: 'home', redirectTo: '/', pathMatch: 'full' },
  {
    path: '',
    loadComponent: () =>
      import('./pages/pages.component').then((c) => c.PagesComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./pages/about/about.component').then((c) => c.AboutComponent),
      },
      {
        path: 'blogs',
        loadComponent: () =>
          import('./pages/blogs/blogs.component').then((c) => c.BlogsComponent),
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
