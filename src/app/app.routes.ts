import { Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {authGuardGuard, publicGuardGuard} from "./core/guards";
import {MainComponent} from "./pages/dashboard/main/main.component";

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: '',
        loadComponent: ()=> import('./shared/main/main.component')
      },
      {
        path: 'gallery',
        loadComponent: ()=> import('./pages/gallery/gallery.component')
      },
      {
        path: 'auth',
        canActivate: [publicGuardGuard],
        children: [
          {
            path: 'log-in',
            loadComponent: ()=> import('./pages/auth/log-in/log-in.component')
          },
          {
            path: 'sign-up',
            loadComponent: ()=> import('./pages/auth/sign-up/siqn-up.component')
          }
        ]
      }
    ]
  },
  {
    path: 'dashboard',
    canActivate: [authGuardGuard],
    loadComponent: ()=> import('./pages/dashboard/dashboard.component'),
    children: [
      {
        path: '',
        component: MainComponent
      },
      {
        path: 'storage',
        loadComponent: ()=> import('./pages/dashboard/storage/storage.component')
      },
      {
        path: 'profile',
        loadComponent: ()=> import('./pages/dashboard/profile/profile.component')
      },
      {
        path: 'settings',
        loadComponent: ()=> import('./pages/dashboard/settings/settings.component')
      },
      {
        path: 'gallery',
        loadComponent: ()=> import('./pages/gallery/gallery.component')
      },
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    pathMatch: 'full'
  }
];
