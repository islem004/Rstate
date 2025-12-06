import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export class Profile {
  user: any;

  constructor() {
    const currentUser = localStorage.getItem('currentUser');
    this.user = currentUser
      ? JSON.parse(currentUser)
      : {
          name: 'Guest',
          email: '',
          phone: '',
          address: '',
          profilePicture: 'https://via.placeholder.com/150',
        };
  }

  saveChanges() {
    console.log('User updated:', this.user);
    alert('Profile updated successfully!');
  }
}
