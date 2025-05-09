import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

declare var bootstrap: any; // ✅ Declare Bootstrap for tooltip initialization

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userId: string = ''; // ✅ Added userId property
  password: string = ''; // ✅ Added password property
  pin: string = "";
  errorMsg: string = '';
  showPassword: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void { // ✅ Initialize Bootstrap tooltips
    const tooltipTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach(tooltipEl => new bootstrap.Tooltip(tooltipEl));
  }

  togglePasswordVisibility(): void { // ✅ Toggle password visibility
    this.showPassword = !this.showPassword;
  }

  login() {
    const payload = {
      userId: this.userId,
      password: this.password
    };

    this.http.post<any>('http://localhost:8080/api/admin/login', payload)
      .subscribe({
        next: (response) => {
          if (response.success) {
            localStorage.setItem('adminLoggedIn', 'true');
            alert('Login successful!');
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMsg = response.message || 'Login failed.';
          }
        },
        error: (error) => {
          this.errorMsg = error.error?.message || 'Server error. Try again later.';
        }
      });
  }
}
