// dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Visitor1 } from '../model/enquiry';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  private baseUrl = 'http://localhost:8080/Enquire';

  constructor(private http: HttpClient) {}

  // Create a new enquiry
  addEnquiry(visitor: Visitor1): Observable<Visitor1> {
    return this.http.post<Visitor1>(this.baseUrl, visitor).pipe(
      catchError(this.handleError)
    );
  }

  // Get all enquiries
  getEnquiries(): Observable<Visitor1[]> {
    return this.http.get<Visitor1[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Get a single enquiry by ID
  getEnquiryById(id: number): Observable<Visitor1> {
    return this.http.get<Visitor1>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Update an enquiry by ID
  updateEnquiry(id: number, updatedVisitor: Visitor1): Observable<Visitor1> {
    return this.http.put<Visitor1>(`${this.baseUrl}/${id}`, updatedVisitor).pipe(
      catchError(this.handleError)
    );
  }

  // Delete an enquiry by ID
  deleteEnquiry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Error handling
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
