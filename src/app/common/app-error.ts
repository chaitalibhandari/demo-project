export class AppError {
  message = 'Application error occurred. Please contact support team.';
  constructor(public originalError?: any) {}
}
