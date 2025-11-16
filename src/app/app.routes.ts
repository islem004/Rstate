// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: HomeComponent },           // الصفحة الرئيسية
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'properties', component: class { } },     // نعملها بعدين
  { path: 'property/:id', component: class { } },   // نعملها بعدين
  { path: '**', redirectTo: '' }                    // أي رابط غلط يرجع للـ home
];