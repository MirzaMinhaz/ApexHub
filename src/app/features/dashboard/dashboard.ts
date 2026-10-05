import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Auth } from '../../core/services/auth';

interface MeResponse {
  message: string;
  username: string;
  role: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  username = '';
  role = '';
  message = '';

  constructor(
    private http: HttpClient,
    private authService: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.http
      .get<MeResponse>('https://localhost:7204/api/Auth/me')
      .subscribe({

        next: (response) => {

          console.log('Authenticated user:', response);

          this.message = response.message;
          this.username = response.username;
          this.role = response.role;
        },

        error: (error) => {

          console.error('Authentication failed:', error);

          if (error.status === 401) {
            this.authService.logout();
            this.router.navigate(['/login']);
          }
        }

      });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}