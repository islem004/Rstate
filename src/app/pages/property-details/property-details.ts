import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HouseService } from '../../services/house.service';
import { AuthService } from '../../services/auth.service';
import { House } from '../../models/house.model';

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './property-details.html',
})
export class PropertyDetailsComponent implements OnInit {
  house!: House | null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private houseService: HouseService,
    public auth: AuthService
  ) {}

 ngOnInit(): void {
  const idParam = this.route.snapshot.paramMap.get('id');
  if (!idParam) {
    console.error('No property ID in route');
    this.loading = false;
    return;
  }

  // Use the getHouse method directly
  this.houseService.getHouse(idParam).subscribe({
    next: (house) => {
      this.house = house;
      this.loading = false;
    },
    error: (err) => {
      console.error('Failed to fetch house', err);
      this.loading = false;
    }
  });
}

}
