import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Visitor1 } from '../../model/enquiry';
import { EnquiryService } from 'src/app/services/enquiry.service';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements OnInit {
  currentUser = 'Admin';
  visitor1: Visitor1[] = [];
  originalVisitor1: Visitor1[] = [];
  searchTerm = '';

  constructor(
    private enquiryService: EnquiryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllVisitors();
  }

  getAllVisitors(): void {
    this.enquiryService.getEnquiries().subscribe({
      next: (data) => {
        this.visitor1 = data;
        this.originalVisitor1 = data;
      },
      error: (err) => console.error(err)
    });
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.visitor1 = this.originalVisitor1.filter(visitor =>
      visitor.name.toLowerCase().includes(term)
    );
  }

  editVisitor(visitor: Visitor1): void {
    this.router.navigate(['/visitor', visitor.id]);
  }

  deleteVisitor(id: number): void {
    if (confirm('Are you sure to delete this enquiry?')) {
      this.enquiryService.deleteEnquiry(id).subscribe({
        next: () => this.getAllVisitors(),
        error: (err) => console.error(err)
      });
    }
  }

  onLogout(): void {
    localStorage.removeItem('adminLoggedIn');  // Clear the login token
    this.router.navigate(['/login']);          // Redirect to login page
  }
}