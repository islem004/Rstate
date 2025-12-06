import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import {SignupComponent}from'./pages/signup/signup';
import { PropertyDetailsComponent } from './pages/property-details/property-details';
import {PropertiesComponent}from'./pages/properties/properties';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'property/:id', component: PropertyDetailsComponent},
  {path: 'properties', component: PropertiesComponent},
  { path: '**', redirectTo: '' },
  {path: 'dashboard', component: UserDashboardComponent}

];
