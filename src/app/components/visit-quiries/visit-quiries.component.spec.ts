import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitQuiriesComponent } from './visit-quiries.component';

describe('VisitQuiriesComponent', () => {
  let component: VisitQuiriesComponent;
  let fixture: ComponentFixture<VisitQuiriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitQuiriesComponent]
    });
    fixture = TestBed.createComponent(VisitQuiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
