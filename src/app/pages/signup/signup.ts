import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class SignupComponent {

  name = '';
  email = '';
  password = '';
  message = '';  // <-- new property to hold the notification

  constructor(private auth: AuthService, private router: Router) {}

  onSignup() {
    const data = { name: this.name, email: this.email, password: this.password };

    this.auth.signup(data).subscribe({
      next: () => {
        this.message = 'Account created! You can now login.';
        // Optionally clear the form
        this.name = '';
        this.email = '';
        this.password = '';
        // Navigate after a short delay
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.message = 'Something went wrong. Please try again.';
      }
    });
  }
}
