
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
providers: [ provideRouter(routes), provideHttpClient() ]