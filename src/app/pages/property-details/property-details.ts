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
  styleUrls: ['./property-details.css']
})
export class PropertyDetailsComponent implements OnInit {
  house!: House;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private houseService: HouseService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.houseService.getHouse(+id).subscribe({
        next: (data) => {
          this.house = data;
          this.loading = false;
        },
        error: () => this.loading = false
      });
    }
  }
}
