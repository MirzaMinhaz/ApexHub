export interface VerifyOtpRequest {
  userId: number;
  otp: string;
  purpose: string;
}