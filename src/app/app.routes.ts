import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Otp } from './features/auth/otp/otp';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: 'verify-otp',
    component: Otp
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];