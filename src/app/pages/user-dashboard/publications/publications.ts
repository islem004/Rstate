// publications.component.ts - FULL READY-TO-PASTE FILE (WITH CLIENT-SIDE FILTER BACKUP)

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PublicationService } from '../../../services/publication';
import { AuthService } from '../../../services/auth.service';
import { House } from '../../../models/house.model';

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './publications.html',
})
export class PublicationsComponent implements OnInit {
  houses: House[] = [];
  loading = true;

  constructor(
    private pubService: PublicationService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.auth.getUserId();

    if (!userId) {
      alert('You must be logged in!');
      this.loading = false;
      return;
    }

    const currentUserId = Number(userId);

    // Load all houses first, then filter client-side as backup
    this.pubService.getByOwner(currentUserId).subscribe({
      next: (data) => {
        // Server-side filter should work, but we add client-side backup
        this.houses = data.filter(h => h.ownerId === currentUserId);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading publications:', err);
        this.houses = [];
        this.loading = false;
      }
    });
  }

  deleteHouse(id: any): void {
    if (!confirm('Are you sure you want to delete this publication?')) return;

    this.pubService.delete(id).subscribe({
      next: () => {
        this.houses = this.houses.filter(h => h.id !== id);
      },
      error: (err) => {
        console.error('Delete failed', err);
        alert('Failed to delete.');
      }
    });
  }
}