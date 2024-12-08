import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';

    if (isLoggedIn) {
      return true; // Allow access
    } else {
      // Redirect to the login page
      this.router.navigate(['/admin-login']);
      return false;
    }
  }
}
