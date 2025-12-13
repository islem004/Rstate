// profile.component.ts - FULL READY-TO-PASTE (saves to backend + localStorage)
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export class Profile implements OnInit {
  user: any = {
    name: 'Guest',
    email: '',
    phone: '',
    address: '',
    profilePicture: 'https://via.placeholder.com/150',
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.user = JSON.parse(currentUser);
    }
  }

  saveChanges() {
    if (!this.user.id) {
      alert('No user ID found. Please log in again.');
      return;
    }

    this.userService.updateUser(this.user.id, this.user).subscribe({
      next: (updatedUser) => {
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        alert('Profile updated successfully!');
      },
      error: (err) => {
        console.error('Update failed', err);
        alert('Failed to update profile. Check console.');
      }
    });
  }

  downloadProfilePicture() {
    const link = document.createElement('a');
    link.href = this.user.profilePicture;
    link.download = 'profile-picture.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.profilePicture = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}