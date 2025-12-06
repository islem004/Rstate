import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HouseService } from '../../services/house.service';
import { FavoriteService } from '../../services/fav.service';
import { House } from '../../models/house.model';

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

  searchForm = {
    location: '',
    propertyType: '',
    priceRange: '',
    type: ''
  };

  constructor(
    private houseService: HouseService,
    private favService: FavoriteService,
    private router: Router
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
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.featuredHouses = [];
      }
    });
  }

  toggleFavorite(house: House): void {
    if (!this.userId) {
      this.showToast('Please login to save favorites', 'danger');
      return;
    }

    house.isFavorite = !house.isFavorite;
    const message = house.isFavorite ? 'Added to favorites ❤️' : 'Removed from favorites 💔';
    this.showToast(message, 'primary');
  }

  showToast(message: string, type: 'primary' | 'danger' = 'primary') {
    const toastEl = document.getElementById('favoriteToast');
    if (!toastEl) return;

    const toastBody = toastEl.querySelector('.toast-body') as HTMLElement;
    toastBody.textContent = message;
    toastEl.className = `toast align-items-center text-white bg-${type} border-0`;

    const bsToast = new (window as any).bootstrap.Toast(toastEl);
    bsToast.show();
  }

  onSearch(): void {
    const queryParams = new URLSearchParams();
    if (this.searchForm.location) queryParams.set('location', this.searchForm.location);
    if (this.searchForm.propertyType) queryParams.set('propertyType', this.searchForm.propertyType);
    if (this.searchForm.priceRange) queryParams.set('priceRange', this.searchForm.priceRange);
    if (this.searchForm.type) queryParams.set('type', this.searchForm.type);

    window.location.href = `/properties?${queryParams.toString()}`;
  }

  formatPrice(house: House): string {
    return house.type === 'rent' ? `$${house.price}/mo` : `$${house.price}`;
  }

}
