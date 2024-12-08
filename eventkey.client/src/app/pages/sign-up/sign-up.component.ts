import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; // Update the path to your actual service
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Added Router for navigation

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  SignUpFormGroup: FormGroup;
  isEventManager = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // Inject the AuthService
    private router: Router // Inject the Router for redirection
  ) {
    this.SignUpFormGroup = this.fb.group({
      userType: ['', Validators.required],
      fullName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      gender: ['', Validators.required],
      eventType: [''],
      companyName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.SignUpFormGroup.get('password')?.valueChanges.subscribe(() => {
      const confirmPassword = this.SignUpFormGroup.get('confirmPassword');
      if (confirmPassword && confirmPassword.value !== this.SignUpFormGroup.get('password')?.value) {
        confirmPassword.setErrors({ mismatch: true });
      }
    });
  }

  toggleEventType(isEventManager: boolean): void {
    this.isEventManager = isEventManager;
    if (!isEventManager) {
      this.SignUpFormGroup.patchValue({
        eventType: '',
        companyName: ''
      });
    }
  }

  onSubmit(): void {
    if (this.SignUpFormGroup.valid) {
      const formData = this.SignUpFormGroup.value;
      this.authService.signUp(formData).subscribe({
        next: (response) => {
          console.log('Sign-up successful', response);
          alert('Sign-up successful!');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error during sign-up:', error);
          alert('An error occurred during sign-up. Please try again.');
        },
      });
    } else {
      console.log('Form is invalid.');
    }
  }
}
