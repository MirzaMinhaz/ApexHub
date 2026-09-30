import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginRequest } from '../models/login-request';
import { RegisterRequest } from '../models/register-request';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private apiUrl = 'https://localhost:7204/api/Auth';

  constructor(
    private http: HttpClient
  ) {}

  register(
    request: RegisterRequest
  ): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/register`,
      request
    );
  }

  login(
    request: LoginRequest
  ): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/login`,
      request
    );
  }
}