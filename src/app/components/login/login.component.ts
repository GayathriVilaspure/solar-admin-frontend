import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  pin: string = "";
  errorMsg: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post<any>('http://localhost:8080/api/admin/login', { pin: this.pin })
      .subscribe({
        next: (response) => {
          console.log('Login response:', response);
          if (response.success) {
            localStorage.setItem('adminLoggedIn', 'true');
            alert('Login successful!');
            // localStorage.setItem('token', response.token);
            // localStorage.setItem('role', response.role);
  
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMsg = response.message || 'Login failed. Please try again.';
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          this.errorMsg = error.error?.message || 'Server error. Please try again later.';
        }
      });
  }
  
}
