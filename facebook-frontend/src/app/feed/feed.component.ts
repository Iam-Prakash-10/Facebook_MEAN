import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  template: `
    <div class="feed-container">
      <header>
        <h1>Facebook</h1>
        <button (click)="logout()">Logout</button>
      </header>
      
      <div class="post-form">
        <textarea 
          [(ngModel)]="newPost" 
          placeholder="What's on your mind?"
        ></textarea>
        <button (click)="createPost()">Post</button>
      </div>
      
      <div class="posts">
        <div *ngFor="let post of posts" class="post">
          <h3>{{ post.username }}</h3>
          <p>{{ post.content }}</p>
          <small>{{ post.createdAt | date }}</small>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .feed-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    
    .post-form {
      background: white;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    
    textarea {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      resize: none;
    }
    
    .post {
      background: white;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 15px;
    }
  `]
})
export class FeedComponent implements OnInit {
  posts: any[] = [];
  newPost: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
    // TODO: Load posts from backend
  }

  createPost() {
    if (this.newPost.trim()) {
      // TODO: Implement post creation
      this.newPost = '';
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
