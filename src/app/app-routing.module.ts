import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VisitorFormComponent } from './components/visitor-form/visitor-form.component';
import { EnquiryComponent } from './components/enquiry/enquiry.component';
import { SolarRegistrationFormComponent } from './components/solar-registration-form/solar-registration-form.component';
import { StatusInstallationComponent } from './components/status-installation/status-installation.component';
import { VisitQuiriesComponent } from './components/visit-quiries/visit-quiries.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'enquiries', component: EnquiryComponent },
      { path: 'registrations', component: SolarRegistrationFormComponent },
      { path: 'installations', component: StatusInstallationComponent },
      { path: 'visit-queries', component: VisitQuiriesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}




