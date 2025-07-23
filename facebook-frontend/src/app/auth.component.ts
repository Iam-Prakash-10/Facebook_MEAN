import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Login</h2>
    <form (ngSubmit)="login()">
      <input [(ngModel)]="loginEmail" name="loginEmail" placeholder="Email" required />
      <input [(ngModel)]="loginPassword" name="loginPassword" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <div *ngIf="loginError" style="color:red">{{loginError}}</div>
    <hr />
    <h2>Register</h2>
    <form (ngSubmit)="register()">
      <input [(ngModel)]="registerUsername" name="registerUsername" placeholder="Username" required />
      <input [(ngModel)]="registerEmail" name="registerEmail" placeholder="Email" required />
      <input [(ngModel)]="registerPassword" name="registerPassword" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
    <div *ngIf="registerError" style="color:red">{{registerError}}</div>
    <div *ngIf="registerSuccess" style="color:green">Registration successful! Please login.</div>
  `
})
export class AuthComponent {
  loginEmail = '';
  loginPassword = '';
  loginError = '';
  registerUsername = '';
  registerEmail = '';
  registerPassword = '';
  registerError = '';
  registerSuccess = false;

  constructor(private auth: AuthService) {}

  login() {
    this.auth.login({ email: this.loginEmail, password: this.loginPassword }).subscribe({
      next: (res) => {
        this.auth.setToken(res.token);
        window.location.reload();
      },
      error: (err) => {
        this.loginError = err.error.msg || 'Login failed';
      }
    });
  }

  register() {
    this.auth.register({ username: this.registerUsername, email: this.registerEmail, password: this.registerPassword }).subscribe({
      next: () => {
        this.registerSuccess = true;
        this.registerError = '';
      },
      error: (err) => {
        this.registerError = err.error.msg || 'Registration failed';
        this.registerSuccess = false;
      }
    });
  }
} 