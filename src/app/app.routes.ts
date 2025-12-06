import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { SignupComponent } from './pages/signup/signup';
import { PropertyDetailsComponent } from './pages/property-details/property-details';
import { PropertiesComponent } from './pages/properties/properties';
import { UserDashboard } from './pages/user-dashboard/user-dashboard/user-dashboard';
import { Profile } from './pages/user-dashboard/profile/profile';
import { Favorites } from './pages/user-dashboard/favorites/favorites';
import { Publications } from './pages/user-dashboard/publications/publications';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'property/:id', component: PropertyDetailsComponent },
  { path: 'properties', component: PropertiesComponent },
  {
    path: 'dashboard',
    component: UserDashboard,
    children: [
      { path: 'profile', component: Profile },
      { path: 'favorites', component: Favorites },
      { path: 'publications', component: Publications },
      { path: '', redirectTo: 'profile', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];
