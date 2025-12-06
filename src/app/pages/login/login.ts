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
        this.successMessage = 'Login successful! Welcome back';
        this.errorMessage = '';

        // ← السحر هنا يا ملك
        const redirectUrl = localStorage.getItem('redirectAfterLogin') || '/';
        localStorage.removeItem('redirectAfterLogin'); // نمسحها باش ما تتكررش

        // نرجّعو للصفحة اللي كان عايز يشوفها (مثلاً /properties/15)
        setTimeout(() => {
          this.router.navigate([redirectUrl]);
        }, 1000);

      } else {
        this.errorMessage = 'Invalid email or password.';
        this.successMessage = '';
      }
    });
  }
}