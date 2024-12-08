import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      userType: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // Toggles visibility for additional fields (if needed)
  toggleEventType(isEventManager: boolean): void {
    console.log('Event Manager selected:', isEventManager);
  }
  onLogin(): void {
    if (this.loginForm.valid) {
      const formData = {
        loginAs: this.loginForm.value.userType, // User or EventManager
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      console.log("Login payload: ", formData); // Debugging

      this.authService.login(formData).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          alert(`Welcome`);
        },
        error: (error) => {
          console.error('Login failed', error);
          alert('An error occurred.- Invalid Credentials');
        },
      });
    } else {
      alert('Please fill out the form correctly.');
    }
  }


  onReset(): void {
    this.loginForm.reset();
  }
}
