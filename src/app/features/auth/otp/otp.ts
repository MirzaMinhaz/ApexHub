import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { Auth } from '../../../core/services/auth';
import { VerifyOtpRequest } from '../../../core/models/verify-otp-request';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './otp.html',
  styleUrl: './otp.css',
})
export class Otp {

  otpForm: FormGroup;

  isLoading = false;
  isResending = false;

  errorMessage = '';
  successMessage = '';

  username = '';
  mobileNumber = '';

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router,
  ) {

    this.otpForm = this.fb.group({
      otp: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{6}$/),
        ],
      ],
    });

    // Get registration information
    // stored by Register component
    this.username =
      sessionStorage.getItem('otpUsername') ?? '';

    this.mobileNumber =
      sessionStorage.getItem('otpMobileNumber') ?? '';
  }

  onVerifyOtp(): void {

    this.errorMessage = '';
    this.successMessage = '';

    // Validate OTP form
    if (this.otpForm.invalid) {
      this.otpForm.markAllAsTouched();
      return;
    }

    // Get User ID
    const userIdString =
      sessionStorage.getItem('otpUserId');

    if (!userIdString) {

      this.errorMessage =
        'Registration session expired. Please register again.';

      return;
    }

    // Prepare request
    const request: VerifyOtpRequest = {

      userId: Number(userIdString),

      otp: this.otpForm.value.otp,

      purpose: 'Registration',
    };

    this.isLoading = true;

    // Verify OTP
    this.authService
      .verifyOtp(request)
      .subscribe({

        next: (response) => {

          console.log(
            'OTP verification successful:',
            response,
          );

          this.isLoading = false;

          this.successMessage =
            'OTP verified successfully.';

          // Remove temporary registration data
          sessionStorage.removeItem('otpUserId');

          sessionStorage.removeItem('otpUsername');

          sessionStorage.removeItem('otpMobileNumber');

          // Go to login
          setTimeout(() => {

            this.router.navigate([
              '/login',
            ]);

          }, 1000);
        },

        error: (error) => {

          console.error(
            'OTP verification failed:',
            error,
          );

          this.isLoading = false;

          this.errorMessage =
            error?.error?.message ??
            'Invalid or expired OTP.';
        },
      });
  }

  onResendOtp(): void {

    this.errorMessage = '';
    this.successMessage = '';

    // Get User ID
    const userIdString =
      sessionStorage.getItem('otpUserId');

    if (!userIdString) {

      this.errorMessage =
        'Registration session expired. Please register again.';

      return;
    }

    this.isResending = true;

    // Generate new OTP
    this.authService
      .generateOtp(
        Number(userIdString),
        'Registration',
      )
      .subscribe({

        next: (response) => {

          console.log(
            'OTP resent successfully:',
            response,
          );

          this.isResending = false;

          this.successMessage =
            'A new OTP has been sent to your mobile number.';
        },

        error: (error) => {

          console.error(
            'OTP resend failed:',
            error,
          );

          this.isResending = false;

          this.errorMessage =
            error?.error?.message ??
            'Unable to resend OTP. Please try again.';
        },
      });
  }
}