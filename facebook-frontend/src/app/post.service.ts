import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  private api = 'http://localhost:5000/api/posts';
  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    return this.http.get(this.api);
  }

  createPost(text: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post(this.api, { text }, { headers });
  }
} 