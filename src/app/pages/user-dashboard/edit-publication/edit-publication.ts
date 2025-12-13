import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PublicationService } from '../../../services/publication';
import { AuthService } from '../../../services/auth.service';
import { House } from '../../../models/house.model';

@Component({
  selector: 'app-edit-publication',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-publication.html'
})
export class EditPublication implements OnInit {
  form: FormGroup;
  houseId!: any;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private pubService: PublicationService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      price: [0, Validators.required],
      beds: [1],
      baths: [1],
      sqft: [0],
      type: ['sale', Validators.required],
      propertyType: ['house', Validators.required],
      image: ['', Validators.required],
      description: [''],
      agent: [''],
      phone: [''],
      whatsapp: [''],
      mapLink: ['']
    });
  }

  ngOnInit(): void {
    this.houseId = this.route.snapshot.paramMap.get('id');

    if (!this.houseId) {
      alert('No property ID found!');
      this.router.navigate(['/dashboard/publications']);
      return;
    }

    this.pubService.getOne(this.houseId).subscribe({
      next: (house) => {
        this.form.patchValue(house);
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load property', err);
        alert('Property not found or error loading.');
        this.router.navigate(['/dashboard/publications']);
      }
    });
  }

  submit(): void {
    if (!this.auth.getUserId()) {
      alert('You must be logged in!');
      return;
    }
    if (this.form.invalid) {
      alert('Please fill all required fields.');
      return;
    }

    const updatedHouse: House = {
      id: this.houseId,
      ownerId: Number(this.auth.getUserId()),
      ...this.form.value
    };

    this.pubService.update(this.houseId, updatedHouse).subscribe({
      next: () => {
        alert('Publication updated successfully!');
        this.router.navigate(['/dashboard/publications']);
      },
      error: (err) => {
        console.error('Update failed', err);
        alert('Failed to update. Try again.');
      }
    });
  }
}