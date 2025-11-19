import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HouseService } from '../../services/house.service';
import { House } from '../../models/house.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './properties.html',
  styleUrls: ['./properties.css']
})
export class PropertiesComponent implements OnInit {
  houses: House[] = [];
  filteredHouses: House[] = [];
  loading = true;

  filters = {
    location: '',
    type: '' as 'sale' | 'rent' | '',
    propertyType: '',
    priceRange: ''
  };

  notification = {
    show: false,
    message: '',
    type: 'info' // 'success' | 'danger' | 'warning' | 'info'
  };

  constructor(
    private houseService: HouseService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    this.filters = {
      location: urlParams.get('location') || '',
      propertyType: urlParams.get('propertyType') || '',
      priceRange: urlParams.get('priceRange') || '',
      type: (urlParams.get('type') as 'sale' | 'rent') || ''
    };

    this.houseService.getHouses().subscribe({
      next: (data) => {
        this.houses = data;
        this.filteredHouses = data;
        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.filteredHouses = [];
        this.showNotification('Failed to load properties.', 'danger');
      }
    });
  }

  applyFilters() {
    let result = [...this.houses];

    if (this.filters.location) {
      result = result.filter(h =>
        h.location.toLowerCase().includes(this.filters.location.toLowerCase())
      );
    }

    if (this.filters.type) {
      result = result.filter(h => h.type === this.filters.type);
    }

    if (this.filters.propertyType) {
      result = result.filter(h => h.propertyType === this.filters.propertyType);
    }

    if (this.filters.priceRange) {
      const [minStr, maxStr] = this.filters.priceRange.split('-');
      const min = Number(minStr);
      const max = maxStr && maxStr !== '+' ? Number(maxStr) : Infinity;
      result = result.filter(h => h.price >= min && (max === Infinity || h.price <= max));
    }

    this.filteredHouses = result;
  }

  clearFilters() {
    this.filters = { location: '', type: '', propertyType: '', priceRange: '' };
    this.filteredHouses = this.houses;
    history.replaceState({}, '', '/properties');
  }

  viewDetails(houseId: number) {
    if (!this.auth.isLoggedIn()) {
      this.showNotification('Please login or sign up to view full property details.', 'warning');
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/property', houseId]);
  }

  showNotification(message: string, type: 'success' | 'danger' | 'warning' | 'info' = 'info', duration = 3000) {
    this.notification = { show: true, message, type };
    setTimeout(() => this.notification.show = false, duration);
  }
}
