import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Visitor2 } from '../model/solar-registration-form';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private baseUrl = 'http://localhost:8080/api/solar-registration';

  constructor(private http: HttpClient) {}

  // Add new registration
  addRegistration(visitor: Visitor2): Observable<Visitor2> {
    return this.http.post<Visitor2>(this.baseUrl, visitor).pipe(
      catchError(this.handleError)
    );
  }

  // Get all registrations
  getRegistrations(): Observable<Visitor2[]> {
    return this.http.get<Visitor2[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Get registration by ID
  getRegistrationById(id: number): Observable<Visitor2> {
    return this.http.get<Visitor2>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Update registration
  updateRegistration(id: number, visitor: Visitor2): Observable<Visitor2> {
    return this.http.put<Visitor2>(`${this.baseUrl}/${id}`, visitor).pipe(
      catchError(this.handleError)
    );
  }

  // Delete registration
  deleteRegistration(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Error handler
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