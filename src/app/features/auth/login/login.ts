import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { RouterLink } from '@angular/router';

import { LoginRequest } from '../../../core/models/login-request';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: Auth
  ) {

    this.loginForm = this.fb.group({

      username: [
        '',
        Validators.required
      ],

      password: [
        '',
        Validators.required
      ]

    });
  }

  onLogin(): void {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;
    }

    const request: LoginRequest = {

      username: this.loginForm.value.username,

      password: this.loginForm.value.password

    };

    this.authService.login(request).subscribe({

      next: (response) => {

        console.log(
          'Login successful:',
          response
        );

      },

      error: (error) => {

        console.error(
          'Login failed:',
          error
        );

      }

    });
  }
}