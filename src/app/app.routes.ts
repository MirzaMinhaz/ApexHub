import { Routes } from '@angular/router';

import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Otp } from './features/auth/otp/otp';
import { Dashboard } from './features/dashboard/dashboard';

import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [

  // Login
  {
    path: 'login',
    component: Login,
  },

  // Registration
  {
    path: 'register',
    component: Register,
  },

  // OTP Verification
  {
    path: 'verify-otp',
    component: Otp,
  },

  // Protected Dashboard
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
  },

  // Default route
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // Unknown route
  {
    path: '**',
    redirectTo: 'login',
  },
];