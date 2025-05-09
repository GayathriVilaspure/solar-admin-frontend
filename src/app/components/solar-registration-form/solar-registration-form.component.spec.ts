import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarRegistrationFormComponent } from './solar-registration-form.component';

describe('SolarRegistrationFormComponent', () => {
  let component: SolarRegistrationFormComponent;
  let fixture: ComponentFixture<SolarRegistrationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolarRegistrationFormComponent]
    });
    fixture = TestBed.createComponent(SolarRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
