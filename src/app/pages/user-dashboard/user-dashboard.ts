import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HouseService } from '../../services/house.service';
import { FavoriteService } from '../../services/fav.service';
import { House } from '../../models/house.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-dashboard.html',
})
export class UserDashboardComponent implements OnInit {

  user: any = null;
  myProperties: House[] = [];
  myFavorites: House[] = [];
  loadingFavorites = true;
  activeTab: 'profile' | 'properties' | 'favorites' = 'profile';

  constructor(
    private auth: AuthService,
    private houseService: HouseService,
    private favService: FavoriteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.auth.getCurrentUser();
    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadMyProperties();
    this.loadMyFavorites();
  }

  loadMyProperties() {
    this.houseService.getHouses().subscribe(houses => {
      this.myProperties = houses.filter(h => h.ownerId === this.user.id);
    });
  }

  loadMyFavorites() {
    this.loadingFavorites = true;
    this.favService.getUserFavorites(this.user.id).subscribe({
      next: (entries: any[]) => {
        const favIds = entries.map(e => e.houseId);
        this.houseService.getHouses().subscribe(all => {
          this.myFavorites = all.filter(h => favIds.includes(h.id));
          this.loadingFavorites = false;
        });
      },
      error: () => {
        this.myFavorites = [];
        this.loadingFavorites = false;
      }
    });
  }

  // هذي الدالة اللي كانت ناقصة
  viewDetails(houseId: number) {
    this.router.navigate(['/property', houseId]);
  }

  removeFavorite(favId: number) {
    if (confirm('Remove from favorites?')) {
      this.favService.removeFavorite(favId).subscribe(() => {
        this.loadMyFavorites();
      });
    }
  }

  deleteProperty(id: number) {
    if (confirm('Delete this property permanently?')) {
      alert('Delete feature coming soon!');
    }
  }
}