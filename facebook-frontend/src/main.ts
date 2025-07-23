import { bootstrapApplication } from '@angular/platform-browser';
import { FeedComponent } from './app/feed.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(FeedComponent, {
  providers: [provideHttpClient()]
});
