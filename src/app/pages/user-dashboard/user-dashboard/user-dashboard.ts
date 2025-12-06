import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="dashboard-layout py-5" style="min-height: 80vh;">
      <router-outlet></router-outlet> <!-- CHILD ROUTES RENDER HERE -->
    </div>
  `,
})
export class UserDashboard {}
