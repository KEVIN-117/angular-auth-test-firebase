import { Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {authGuardGuard, publicGuardGuard} from "./core/guards";

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [publicGuardGuard],
    children: [
      {
        path: '',
        loadComponent: ()=> import('./shared/main/main.component')
      },
      {
        path: 'auth',
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
    loadComponent: ()=> import('./pages/dashboard/dashboard.component')
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    pathMatch: 'full'
  }
];
