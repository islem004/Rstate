import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { HouseService } from '../../services/house';
import { FavoriteService } from '../../services/fav';
import { UserService } from '../../services/user';
import { House } from '../../models/house.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  featuredHouses: House[] = [];
  loading = true;
  currentUser: User | null = null;
  userId: number | null = null;

  searchForm = {
    location: '',
    propertyType: '',
    bedrooms: '',
    priceRange: '',
    type: 'sale'
  };

  constructor(
    private houseService: HouseService,
    private favService: FavoriteService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.checkLoggedInUser();
    this.loadFeaturedHouses();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private checkLoggedInUser(): void {
    const saved = localStorage.getItem('currentUser');
    if (saved) {
      try {
        this.currentUser = JSON.parse(saved);
        this.userId = this.currentUser?.id ?? null;
      } catch (e) {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        this.userId = null;
      }
    } else {
      this.currentUser = null;
      this.userId = null;
    }
  }

  loadFeaturedHouses(): void {
    this.houseService.getHouses().subscribe({
      next: (houses) => {
        this.featuredHouses = houses.slice(0, 6); // First 6 as per Figma grid
        if (this.userId) {
          this.featuredHouses.forEach(house => {
            this.favService.isFavorite(this.userId!, house.id!).pipe(takeUntil(this.destroy$)).subscribe(isFav => {
              house.isFavorite = isFav;
            });
          });
        }
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  toggleFavorite(house: House): void {
    if (!this.userId) {
      alert('Please login to save favorites');
      return;
    }
    if (house.isFavorite) {
      this.favService.checkFavorite(this.userId!, house.id!).subscribe(favs => {
        if (favs.length > 0) {
          this.favService.removeFavorite(favs[0].id).subscribe(() => house.isFavorite = false);
        }
      });
    } else {
      this.favService.addFavorite(this.userId!, house.id!).subscribe(() => house.isFavorite = true);
    }
  }

  onSearch(): void {
    const params = new URLSearchParams();
    if (this.searchForm.location) params.append('location', this.searchForm.location);
    if (this.searchForm.propertyType) params.append('type', this.searchForm.propertyType);
    if (this.searchForm.bedrooms) params.append('beds_gte', this.searchForm.bedrooms);
    if (this.searchForm.priceRange) params.append('price', this.searchForm.priceRange);
    params.append('searchType', this.searchForm.type);
    window.location.href = `/properties?${params.toString()}`;
  }

  getPriceLabel(house: House): string {
    const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(house.price);
    return house.type === 'rent' ? `${formatted}/mo` : formatted;
  }
}