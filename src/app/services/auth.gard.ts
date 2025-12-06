import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      // ← هنا السحر: نحفظ الصفحة اللي كان عايز يروح ليها (مثلاً /properties/15)
      localStorage.setItem('redirectAfterLogin', state.url);

      // نرسلو للـ login
      this.router.navigate(['/login']);
      return false;
    }
  }
}