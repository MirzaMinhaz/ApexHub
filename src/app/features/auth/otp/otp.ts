import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-otp',
  imports: [ReactiveFormsModule],
  templateUrl: './otp.html',
  styleUrl: './otp.css',
})
export class Otp {
  otpForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    });
  }

  onVerifyOtp(): void {
    if (this.otpForm.invalid) {
      this.otpForm.markAllAsTouched();
      return;
    }

    console.log('OTP:', this.otpForm.value.otp);
  }

  onResendOtp(): void {
    console.log('Resend OTP clicked');
  }
}
