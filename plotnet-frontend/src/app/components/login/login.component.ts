import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="login-container">
      <div class="login-card">
        <mat-card>
          <mat-card-header>
            <mat-card-title>PlotNet Login</mat-card-title>
            <mat-card-subtitle>Property Management System</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Email</mat-label>
                <input matInput type="email" formControlName="email" required>
                <mat-icon matSuffix>email</mat-icon>
                <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
                  Email is required
                </mat-error>
                <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
                  Please enter a valid email
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Password</mat-label>
                <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password" required>
                <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                  <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
                </button>
                <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                  Password is required
                </mat-error>
              </mat-form-field>

              <button mat-raised-button color="primary" type="submit" 
                      [disabled]="loginForm.invalid || isLoading" class="login-button">
                <mat-spinner *ngIf="isLoading" diameter="20"></mat-spinner>
                <span *ngIf="!isLoading">Login</span>
              </button>
            </form>

            <div class="demo-credentials">
              <h4>Demo Credentials:</h4>
              <div class="credential-item">
                <strong>Admin:</strong> admin&#64;plotnet.com / password
              </div>
              <div class="credential-item">
                <strong>Associate:</strong> associate&#64;plotnet.com / password
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .login-card {
      width: 100%;
      max-width: 400px;
    }

    mat-card {
      padding: 20px;
    }

    mat-card-header {
      text-align: center;
      margin-bottom: 30px;
    }

    mat-card-title {
      font-size: 2em;
      color: #333;
    }

    mat-card-subtitle {
      color: #666;
      margin-top: 5px;
    }

    .full-width {
      width: 100%;
      margin-bottom: 20px;
    }

    .login-button {
      width: 100%;
      height: 48px;
      font-size: 1.1em;
      margin-top: 10px;
    }

    .demo-credentials {
      margin-top: 30px;
      padding: 15px;
      background: #f5f5f5;
      border-radius: 8px;
      text-align: center;
    }

    .demo-credentials h4 {
      margin: 0 0 10px 0;
      color: #666;
    }

    .credential-item {
      margin: 8px 0;
      font-size: 0.9em;
    }

    mat-spinner {
      margin-right: 10px;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.snackBar.open(`Welcome, ${response.user.name}!`, 'Close', { duration: 3000 });
          
          // Redirect based on user role
          switch (response.user.role) {
            case 'admin':
              this.router.navigate(['/admin']);
              break;
            case 'associate':
              this.router.navigate(['/associate']);
              break;
            default:
              this.router.navigate(['/schemes']);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.snackBar.open('Invalid credentials. Please try again.', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
