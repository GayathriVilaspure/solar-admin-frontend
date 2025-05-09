import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Visitor2 } from '../../model/solar-registration-form';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-solar-registration-form',
  templateUrl: './solar-registration-form.component.html',
  styleUrls: ['./solar-registration-form.component.css']
})
export class SolarRegistrationFormComponent implements OnInit {
  currentUser = 'Admin';
  visitor2: Visitor2[] = [];
  originalVisitor2: Visitor2[] = [];
  searchTerm = '';

  constructor(
    private registrationService: RegistrationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllVisitors();
  }

  getAllVisitors(): void {
    this.registrationService.getRegistrations().subscribe({
      next: (data) => {
        this.visitor2 = data;
        this.originalVisitor2 = data;
      },
      error: (err) => console.error(err)
    });
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.visitor2 = this.originalVisitor2.filter(visitor =>
      visitor.consumerName.toLowerCase().includes(term)
    );
  }

  editVisitor(visitor: Visitor2): void {
    this.router.navigate(['/solar-registration', visitor.id]);
  }

  deleteVisitor(id: number): void {
    if (confirm('Are you sure to delete this registration?')) {
      this.registrationService.deleteRegistration(id).subscribe({
        next: () => this.getAllVisitors(),
        error: (err) => console.error(err)
      });
    }
  }

  onLogout(): void {
    // TODO: Add logout logic
  }
}