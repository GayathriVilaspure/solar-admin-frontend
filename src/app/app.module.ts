import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VisitorFormComponent } from './components/visitor-form/visitor-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EnquiryComponent } from './components/enquiry/enquiry.component';
import { SolarRegistrationFormComponent } from './components/solar-registration-form/solar-registration-form.component';
import { StatusInstallationComponent } from './components/status-installation/status-installation.component';
import { VisitQuiriesComponent } from './components/visit-quiries/visit-quiries.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    VisitorFormComponent,
    EnquiryComponent,
    SolarRegistrationFormComponent,
    StatusInstallationComponent,
    VisitQuiriesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
