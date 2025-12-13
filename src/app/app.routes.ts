import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { SignupComponent } from './pages/signup/signup';
import { PropertyDetailsComponent } from './pages/property-details/property-details';
import { PropertiesComponent } from './pages/properties/properties';
import { UserDashboard } from './pages/user-dashboard/user-dashboard/user-dashboard';
import { Profile } from './pages/user-dashboard/profile/profile';
import { Favorites } from './pages/user-dashboard/favorites/favorites';
import { PublicationsComponent } from './pages/user-dashboard/publications/publications'; 
import { AddPublication } from './pages/user-dashboard/add-publication/add-publication';
import { EditPublication } from './pages/user-dashboard/edit-publication/edit-publication'; // Add this import
import { AboutComponent } from './pages/about/about';
import { ContactComponent } from './pages/contact/contact';

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
      { path: 'publications', component: PublicationsComponent },
      { path: 'add-publication', component: AddPublication },
      { path: 'edit-publication/:id', component: EditPublication }, // Add this route
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
    ]
  },
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  { path: '**', redirectTo: '' }
];