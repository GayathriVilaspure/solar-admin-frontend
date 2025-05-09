import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Visitor4 } from '../../model/visit-quiries';
import { VisitQueryService } from 'src/app/services/visit-query.service';

@Component({
  selector: 'app-visit-quiries',
  templateUrl: './visit-quiries.component.html',
  styleUrls: ['./visit-quiries.component.css']
})
export class VisitQuiriesComponent implements OnInit {
  currentUser = 'Admin';
  visitor4: Visitor4[] = [];
  originalVisitor4: Visitor4[] = [];
  searchTerm = '';

  constructor(
    private visitQueryService: VisitQueryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllVisitors();
  }

  getAllVisitors(): void {
    this.visitQueryService.getQueries().subscribe({
      next: (data) => {
        this.visitor4 = data;
        this.originalVisitor4 = data;
      },
      error: (err) => console.error(err)
    });
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.visitor4 = this.originalVisitor4.filter(visitor =>
      visitor.consumerName.toLowerCase().includes(term)
    );
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Completed': return 'badge bg-success';
      case 'In Progress': return 'badge bg-warning text-dark';
      case 'Pending': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  }

  addVisitor(): void {
    this.router.navigate(['/visitor']);
  }

  editVisitor(visitor: Visitor4): void {
    this.router.navigate(['/visitor', visitor.id]);
  }

  deleteVisitor(id: number): void {
    if (confirm('Are you sure to delete this visitor?')) {
      this.visitQueryService.deleteQuery(id).subscribe({
        next: () => this.getAllVisitors(),
        error: (err) => console.error(err)
      });
    }
  }

  onLogout(): void {
    // TODO: Add logout logic
  }
}
