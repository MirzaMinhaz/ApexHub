import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { RegisterRequest } from '../../../core/models/register-request';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  registerForm: FormGroup;

  isLoading = false;

  errorMessage = '';

  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router,
  ) {

    this.registerForm = this.fb.group(
      {
        username: [
          '',
          Validators.required,
        ],

        email: [
          '',
          [
            Validators.required,
            Validators.email,
          ],
        ],

        mobileNumber: [
          '',
          Validators.required,
        ],

        password: [
          '',
          Validators.required,
        ],

        confirmPassword: [
          '',
          Validators.required,
        ],
      },
      {
        validators: this.passwordMatchValidator,
      },
    );
  }

  passwordMatchValidator(
    form: FormGroup,
  ) {

    const password =
      form.get('password')?.value;

    const confirmPassword =
      form.get('confirmPassword')?.value;

    if (password === confirmPassword) {
      return null;
    }

    return {
      passwordMismatch: true,
    };
  }

  onRegister(): void {

    // Clear previous messages
    this.errorMessage = '';
    this.successMessage = '';

    // Validate form
    if (this.registerForm.invalid) {

      this.registerForm.markAllAsTouched();

      return;
    }

    // Start loading
    this.isLoading = true;

    // Prepare request
    const request: RegisterRequest = {

      username:
        this.registerForm.value.username,

      email:
        this.registerForm.value.email,

      mobileNumber:
        this.registerForm.value.mobileNumber,

      password:
        this.registerForm.value.password,

      confirmPassword:
        this.registerForm.value.confirmPassword,
    };

    // Call registration API
    this.authService.register(request).subscribe({

      next: (response) => {

        console.log(
          'Registration successful:',
          response,
        );

        this.isLoading = false;

        this.successMessage =
          'Registration successful. OTP sent to your mobile number.';

        // Store OTP verification information
        sessionStorage.setItem(
          'otpUserId',
          response.userId.toString(),
        );

        sessionStorage.setItem(
          'otpUsername',
          response.username,
        );

        sessionStorage.setItem(
          'otpMobileNumber',
          response.mobileNumber,
        );

        // Navigate to OTP verification page
        this.router.navigate([
          '/verify-otp',
        ]);
      },

      error: (error) => {

        console.error(
          'Registration failed:',
          error,
        );

        this.isLoading = false;

        this.errorMessage =
          error?.error?.message ??
          'Registration failed. Please try again.';
      },
    });
  }
}