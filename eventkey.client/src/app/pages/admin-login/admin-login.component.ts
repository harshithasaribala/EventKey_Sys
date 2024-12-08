import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports:[CommonModule,ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  adminLoginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.adminLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onsubmit(): void {
    const { email, password } = this.adminLoginForm.value;

    if (email === 'admin@gmail.com' && password === 'admin') {
      console.log('Admin login successful');
      alert('Sucessful');
      this.router.navigate(['/admin-dashboard']);
    } else {
      console.error('Invalid credentials');
      alert('Invalid credentials. Please try again.');
    }
  }
}
