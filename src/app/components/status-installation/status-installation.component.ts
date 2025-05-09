import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Visitor3 } from '../../model/Status_installation';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-status-installation',
  templateUrl: './status-installation.component.html',
  styleUrls: ['./status-installation.component.css']
})
export class StatusInstallationComponent implements OnInit {
  currentUser = 'Admin';
  visitor3: Visitor3[] = []; // ✅ this holds all data
  originalVisitor3: Visitor3[] = []; // for resetting search
  searchTerm = '';

  constructor(
    private statusService: StatusService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllVisitors();
  }

  getAllVisitors(): void {
    this.statusService.getStatuses().subscribe({
      next: (data) => {
        this.visitor3 = data;
        this.originalVisitor3 = data; // backup for search
      },
      error: (err) => console.error(err)
    });
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Completed': return 'bg-success';
      case 'In Progress': return 'bg-warning';
      case 'Pending': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.visitor3 = this.originalVisitor3.filter(visitor =>
      visitor.consumerName.toLowerCase().includes(term)
    );
  }

  viewVisitor(visitor: Visitor3): void {
    alert(`View Visitor: ${JSON.stringify(visitor, null, 2)}`);
  }

  editVisitor(visitor: Visitor3): void {
    this.router.navigate(['/status', visitor.id]);
  }

  deleteVisitor(id: number): void {
    if (confirm('Are you sure to delete this visitor?')) {
      this.statusService.deleteStatus(id).subscribe({
        next: () => this.getAllVisitors(),
        error: (err) => console.error(err)
      });
    }
  }

  onLogout(): void {
    // TODO: Add logout logic
  }
}
