import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HouseService } from '../../../services/house.service';
import { FavoriteService } from '../../../services/fav.service';
import { House } from '../../../models/house.model';
import { Subject } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.css']
})
export class Favorites implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  favorites: House[] = [];
  userId: number | null = null;
  loading = true;

  constructor(
    private houseService: HouseService,
    private favService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.checkUser();
    if (this.userId) {
      this.loadFavorites();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private checkUser() {
    const saved = localStorage.getItem('currentUser');
    if (saved) this.userId = JSON.parse(saved)?.id ?? null;
  }

  loadFavorites(): void {
    if (!this.userId) return;

    this.favService.getUserFavorites(this.userId).subscribe(favs => {
      const houseIds = favs.map(f => f.houseId);
      this.houseService.getHouses().subscribe(houses => {
        this.favorites = houses.filter(h => houseIds.includes(h.id));
        // Mark all favorites as isFavorite
        this.favorites.forEach(h => h.isFavorite = true);
        this.loading = false;
      });
    });
  }

  removeFavorite(house: House): void {
    if (!this.userId) return;

    this.favService.getUserFavorites(this.userId).subscribe(favs => {
      const fav = favs.find(f => f.houseId === house.id);
      if (fav) {
        this.favService.removeFavorite(fav.id).subscribe(() => {
          house.isFavorite = false;
          this.favorites = this.favorites.filter(h => h.id !== house.id);
        });
      }
    });
  }

}
