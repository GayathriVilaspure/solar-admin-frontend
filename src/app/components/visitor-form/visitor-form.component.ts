import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Visitor3 } from '../../model/Status_installation';
import { VisitorService } from 'src/app/services/visitor.service';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-visitor-form',
  templateUrl: './visitor-form.component.html',
  styleUrls: ['./visitor-form.component.css']
})
export class VisitorFormComponent implements OnInit {
  visitorForm!: FormGroup;
  isEditMode = false;
  isSubmitting = false;
  visitorId!: number;

  constructor(
    private fb: FormBuilder,
    private visitorService: VisitorService,
    private dashboardService: DashboardService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.visitorId = +id;
        this.loadVisitor(this.visitorId);
      }
    });
  }

  initForm(): void {
    this.visitorForm = this.fb.group({
      id: [null],
      consumerName: ['', [Validators.required, Validators.minLength(3)]],
      consumerEmail: ['', [Validators.required, Validators.email]],
      consumerAddress: ['', Validators.required],
      installationStatus: ['Pending', Validators.required]
    });
  }

  loadVisitor(id: number): void {
    this.visitorService.getVisitorById(id).subscribe({
      next: (visitor) => {
        if (visitor) {
          this.visitorForm.patchValue(visitor);
        }
      },
      error: (err) => console.error(err)
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.visitorForm.get(field);
    return !!control?.invalid && (control?.dirty || control?.touched);
  }

  onSubmit(): void {
    if (this.visitorForm.invalid) {
      this.visitorForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const visitor: Visitor3 = this.visitorForm.value;

    if (this.isEditMode) {
      this.visitorService.updateVisitor(this.visitorId, visitor).subscribe({
        next: () => {
          alert('Visitor updated!');
          this.isSubmitting = false;
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error(err);
          this.isSubmitting = false;
        }
      });
    } else {
      this.visitorService.createVisitor(visitor).subscribe({
        next: () => {
          alert('Visitor added!');
          this.isSubmitting = false;
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error(err);
          this.isSubmitting = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard']);
  }
}
