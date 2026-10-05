import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { LoginRequest } from '../models/login-request';
import { RegisterRequest } from '../models/register-request';
import { VerifyOtpRequest } from '../models/verify-otp-request';

export interface LoginResponse {
  message: string;
  token: string;
  username: string;
  role: string;
}

export interface RegisterResponse {
  message: string;
  userId: number;
  username: string;
  mobileNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private apiUrl = 'https://localhost:7204/api/Auth';

  constructor(
    private http: HttpClient
  ) {}

  register(request: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${this.apiUrl}/register`,
      request
    );
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      request
    ).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.username);
        localStorage.setItem('role', response.role);
      })
    );
  }

  generateOtp(
    userId: number,
    purpose: string = 'Registration'
  ) {
    return this.http.post(
      'https://localhost:7204/api/Otp/generate',
      {
        userId,
        purpose
      }
    );
  }

  verifyOtp(request: VerifyOtpRequest) {
    return this.http.post(
      'https://localhost:7204/api/Otp/verify',
      request
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  }
}