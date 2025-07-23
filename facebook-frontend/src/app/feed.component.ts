import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from './post.service';
import { AuthService } from './auth.service';
import { AuthComponent } from './auth.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, FormsModule, AuthComponent],
  template: `
    <div *ngIf="!auth.getToken()">
      <app-auth></app-auth>
    </div>
    <div *ngIf="auth.getToken()">
      <button (click)="logout()">Logout</button>
      <h2>Create Post</h2>
      <form (ngSubmit)="createPost()">
        <input [(ngModel)]="postText" name="postText" placeholder="What's on your mind?" required />
        <button type="submit">Post</button>
      </form>
      <div *ngIf="postError" style="color:red">{{postError}}</div>
      <hr />
      <h2>Feed</h2>
      <div *ngFor="let post of posts">
        <b>{{post.user?.username || 'User'}}</b>: {{post.text}} <i>({{post.createdAt | date:'short'}})</i>
      </div>
    </div>
  `
})
export class FeedComponent implements OnInit {
  postText = '';
  postError = '';
  posts: any[] = [];

  constructor(public auth: AuthService, private postService: PostService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPosts().subscribe({
      next: (data) => this.posts = data,
      error: () => this.posts = []
    });
  }

  createPost() {
    this.postService.createPost(this.postText).subscribe({
      next: () => {
        this.postText = '';
        this.postError = '';
        this.loadPosts();
      },
      error: (err) => {
        this.postError = err.error.msg || 'Failed to post';
      }
    });
  }

  logout() {
    this.auth.logout();
    window.location.reload();
  }
} 