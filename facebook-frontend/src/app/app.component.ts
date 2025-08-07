import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  imports: [CommonModule, RouterOutlet],
  standalone: true
})
export class AppComponent {
  title = 'facebook-frontend';
}
