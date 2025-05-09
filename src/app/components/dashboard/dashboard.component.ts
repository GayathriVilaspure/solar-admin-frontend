import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VisitorService } from 'src/app/services/visitor.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Visitor3 } from 'src/app/model/Status_installation';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser = 'Admin';
  visitors: Visitor3[] = [];
  filteredVisitors: Visitor3[] = [];
  searchTerm: string = '';
  searchField: string = 'consumerName';
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  totalPages = 1;

  // Added properties
  enquiries: any[] = [];
  registrations: any[] = [];
  installations: any[] = [];
  visitQueries: any[] = [];

  constructor(
    private dashboardService: DashboardService,
    private visitorService: VisitorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllVisitors();
    this.loadDashboardData(); // Load additional data
  }

  getAllVisitors(): void {
    this.visitorService.getVisitors().subscribe({
      next: (data) => {
        this.visitors = data;
        this.filteredVisitors = data;
        this.totalItems = data.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      },
      error: (err) => console.error(err)
    });
  }

  loadDashboardData(): void {
    this.dashboardService.getEnquiries().subscribe(data => this.enquiries = data);
    this.dashboardService.getRegistrations().subscribe(data => this.registrations = data);
    this.dashboardService.getInstallations().subscribe(data => this.installations = data);
    this.dashboardService.getVisitQueries().subscribe(data => this.visitQueries = data);
  }

  loadVisitors(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredVisitors = this.visitors.slice(startIndex, endIndex);
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Completed': return 'bg-success';
      case 'In Progress': return 'bg-warning';
      case 'Pending': return 'bg-danger';
      default: return 'bg-info';
    }
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadVisitors();
    }
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredVisitors = this.visitors.filter(visitor =>
      visitor.consumerName.toLowerCase().includes(term)
    );
  }

  addVisitor(): void {
    this.router.navigate(['/visitor']);
  }

  viewVisitor(visitor: Visitor3): void {
    alert(`View Visitor: ${JSON.stringify(visitor, null, 2)}`);
  }

  editVisitor(visitor: Visitor3): void {
    this.router.navigate(['/visitor', visitor.id]);
  }

  deleteVisitor(id: number): void {
    if (confirm('Are you sure to delete this visitor?')) {
      this.dashboardService.deleteVisitor(id).subscribe({
        next: () => this.getAllVisitors(),
        error: (err: any) => console.error(err)
      });
    }
  }

  onLogout(): void {
    localStorage.removeItem('adminLoggedIn');  // Clear the login token
    this.router.navigate(['/login']);          // Redirect to login page
  }
}
