import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  template: `
    <div class="main-container">
      <div class="left-section">
        <h1 class="fb-logo">facebook</h1>
        <p class="fb-tagline">Facebook helps you connect and share with the people in your life.</p>
      </div>
      
      <div class="right-section">
        <div class="login-box">
          <form (ngSubmit)="isLoginMode ? login() : register()" #authForm="ngForm">
            <input 
              type="text" 
              class="input-field" 
              placeholder="Email address"
              [(ngModel)]="email"
              name="email"
              required>
            
            <input 
              *ngIf="!isLoginMode"
              type="text" 
              class="input-field" 
              placeholder="Username"
              [(ngModel)]="username"
              name="username"
              required>
            
            <input 
              type="password" 
              class="input-field" 
              placeholder="Password"
              [(ngModel)]="password"
              name="password"
              required>
            
            <button type="submit" class="login-btn">
              {{ isLoginMode ? 'Log In' : 'Sign Up' }}
            </button>
          </form>
          
          <a href="#" class="forgot-link">Forgotten password?</a>
          
          <hr>
          
          <button (click)="toggleMode()" class="create-account-btn">
            {{ isLoginMode ? 'Create New Account' : 'Back to Login' }}
          </button>
        </div>
      </div>
    </div>
  `
})
export class AuthComponent {
  isLoginMode = true;
  email = '';
  password = '';
  username = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  login() {
    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          this.authService.storeToken(response.token);
          this.router.navigate(['/feed']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          alert('Login failed. Please check your credentials.');
        }
      });
  }

  register() {
    this.authService.register({
      email: this.email,
      password: this.password,
      username: this.username
    }).subscribe({
      next: () => {
        alert('Registration successful! Please login.');
        this.isLoginMode = true;
      },
      error: (error) => {
        console.error('Registration failed:', error);
        alert('Registration failed. Please try again.');
      }
    });
  }
}
