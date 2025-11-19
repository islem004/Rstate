import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email = '';
  password = '';

  successMessage = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.auth.login(this.email, this.password).subscribe(user => {
      if (user) {
        this.successMessage = 'Login successful! Welcome back 😄';
        this.errorMessage = '';

        // Optional: redirect after 1 second
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000);

      } else {
        this.errorMessage = 'Invalid email or password.';
        this.successMessage = '';
      }
    });
  }
}
