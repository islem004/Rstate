import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { HouseService } from '../../services/house.service';
import { FavoriteService } from '../../services/fav.service';
import { UserService } from '../../services/user.service';
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
  userId: number | null = null;

  // Figma-inspired search form (4 fields + buy/rent radio)
  searchForm = {
    location: '',
    propertyType: '',  
    priceRange: '',
    type: 'sale' as 'sale' | 'rent'
  };

  constructor(
    private houseService: HouseService,
    private favService: FavoriteService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.checkUser();
    this.loadFeaturedHouses();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private checkUser() {
    const saved = localStorage.getItem('currentUser');
    if (saved) this.userId = JSON.parse(saved)?.id ?? null;
  }

  loadFeaturedHouses(): void {
    this.houseService.getHouses().subscribe({
      next: (houses) => {
        this.featuredHouses = houses.slice(0, 6);
        if (this.userId) {
          this.featuredHouses.forEach(house => {
            this.favService.isFavorite(this.userId!, house.id!).pipe(takeUntil(this.destroy$)).subscribe(isFav => house.isFavorite = isFav);
          });
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        // Fallback demo data if API fails
        this.featuredHouses = [
          {
            id: 1, title: 'Luxury Villa', location: 'Tunis', price: 1250000, beds: 5, baths: 4, sqft: 4200, type: 'sale', image: 'https://via.placeholder.com/400x300?text=Villa', isFavorite: false,
            description: '',
            ownerId: 0,
            bathrooms: undefined
          },
          {
            id: 2, title: 'Modern Apartment', location: 'Sousse', price: 350000, beds: 3, baths: 2, sqft: 1500, type: 'rent', image: 'https://via.placeholder.com/400x300?text=Apartment', isFavorite: true,
            description: '',
            ownerId: 0,
            bathrooms: undefined
          }
        ];
      }
    });
  }

  toggleFavorite(house: House): void {
    if (!this.userId) {
      alert('Please login to save favorites');
      return;
    }
    if (house.isFavorite) {
      this.favService.checkFavorite(this.userId!, house.id!).subscribe(favs => {
        if (favs.length > 0) this.favService.removeFavorite(favs[0].id).subscribe(() => house.isFavorite = false);
      });
    } else {
      this.favService.addFavorite(this.userId!, house.id!).subscribe(() => house.isFavorite = true);
    }
  }

  onSearch(): void {
    const params = new URLSearchParams();
    if (this.searchForm.location) params.append('location', this.searchForm.location);
    if (this.searchForm.propertyType) params.append('type', this.searchForm.propertyType);
    if (this.searchForm.priceRange) params.append('price', this.searchForm.priceRange);
    params.append('searchType', this.searchForm.type);
    window.location.href = `/search?${params.toString()}`;
  }

  formatPrice(house: House): string {
    return house.type === 'rent' ? `$${house.price}/mo` : `$${house.price}`;
  }
}