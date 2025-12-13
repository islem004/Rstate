import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PublicationService } from '../../../services/publication';
import { AuthService } from '../../../services/auth.service';
import { House } from '../../../models/house.model';

@Component({
  selector: 'app-add-publication',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './add-publication.html'
})
export class AddPublication {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pubService: PublicationService,
    private auth: AuthService,
    private router: Router
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

submit(): void {
  const user = this.auth.getCurrentUser();

  if (!user) return;

  if (user.banned) {
    alert('Your account is banned. You cannot add publications.');
    return;
  }

  if (this.form.invalid) return;

  const newHouse: House = {
    ...this.form.value,
    ownerId: user.id,
    isFavorite: false,
    comments: [],
    showContact: false
  };

  this.pubService.create(newHouse).subscribe(() => {
    this.router.navigate(['/dashboard/publications']);
  });
}

}