import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Visitor5 } from 'src/app/model/visitor';
import { VisitService } from 'src/app/services/visit.service';

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.css']
})
export class VisitorComponent implements OnInit {
  currentUser = 'Admin';
  visitors: Visitor5[] = [];
  originalVisitors: Visitor5[] = [];
  searchTerm = '';

  constructor(
    private visitService: VisitService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllVisitors();
  }

  getAllVisitors(): void {
    this.visitService.getVisits().subscribe({
      next: (data) => {
        this.visitors = data;
        this.originalVisitors = data;
      },
      error: (err) => console.error(err)
    });
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.visitors = this.originalVisitors.filter(visitor =>
      visitor.consumerName.toLowerCase().includes(term)
    );
  }

  editVisitor(visitor: Visitor5): void {
    this.router.navigate(['/visitor', visitor.id]);
  }

  deleteVisitor(id: number): void {
    if (confirm('Are you sure to delete this visitor?')) {
      this.visitService.deleteVisit(id).subscribe({
        next: () => this.getAllVisitors(),
        error: (err) => console.error(err)
      });
    }
  }

  onLogout(): void {
    localStorage.removeItem('adminLoggedIn');
    this.router.navigate(['/login']);
  }
}
