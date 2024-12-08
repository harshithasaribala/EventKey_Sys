import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signUpUrl = 'https://localhost:7215/api/SignUp'; // Replace with your actual API URL
  private loginUrl = 'https://localhost:7215/api/SignUp/login';
  private createEventurl = 'https://localhost:7215/api/Events';
  constructor(private http: HttpClient) { }

  // Sign up method
  signUp(userData: any): Observable<any> {
    return this.http.post(this.signUpUrl, userData);
  }
  login(credentials: { loginAs: string; email: string; password: string; }): Observable<any> {
    return this.http.post(this.loginUrl, credentials);
  }
  createEvent(eventData: any): Observable<any> {
    return this.http.post<any>(this.createEventurl, eventData);
  }
}
