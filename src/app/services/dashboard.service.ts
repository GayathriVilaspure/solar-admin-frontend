// dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Visitor3 } from '../model/Status_installation';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8080/api/consumer'; // Ensure this API is valid for your backend
  private enquiryUrl = 'http://localhost:8080//Enquire'; // Placeholder API for enquiries
  private registrationUrl = 'http://localhost:8080/api/registrations'; // Placeholder API for registrations
  private installationUrl = 'http://localhost:8080/query'; // Placeholder API for installations
  private visitQueryUrl = 'http://localhost:8080/visit'; // Placeholder API for visit queries

  constructor(private http: HttpClient) {}

  // Get all visitors
  getVisitors(): Observable<Visitor3[]> {
    return this.http.get<Visitor3[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Create a new visitor
  createVisitor(visitor: Visitor3): Observable<Visitor3> {
    return this.http.post<Visitor3>(this.apiUrl, visitor).pipe(
      catchError(this.handleError)
    );
  }

  // Update visitor's installation status
  updateVisitor(visitId: number, status: string): Observable<Visitor3> {
    const url = `${this.apiUrl}/update-status?visitId=${visitId}&status=${encodeURIComponent(status)}`;
    return this.http.put<Visitor3>(url, null).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a visitor by ID
  deleteVisitor(id: number): Observable<void> {
    const url = `${this.apiUrl}/delete?visitId=${id}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }

  // Get all enquiries
  getEnquiries(): Observable<any[]> {
    return this.http.get<any[]>(this.enquiryUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Get all registrations
  getRegistrations(): Observable<any[]> {
    return this.http.get<any[]>(this.registrationUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Get all installations
  getInstallations(): Observable<any[]> {
    return this.http.get<any[]>(this.installationUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Get all visit queries
  getVisitQueries(): Observable<any[]> {
    return this.http.get<any[]>(this.visitQueryUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Handle errors
  private handleError(error: HttpErrorResponse) {
    console.error('Server Error:', error);
    let errorMessage = 'Something went wrong! Please try again.';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
