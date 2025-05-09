import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Visitor5 } from '../model/visitor';  // ✅ Import the correct model

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  private apiUrl = 'http://localhost:8080/visit/visitors/get';  // ✅ API endpoint

  constructor(private http: HttpClient) {}

  // ✅ Get all visits
  getVisits(): Observable<Visitor5[]> {
    return this.http.get<Visitor5[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // ✅ Create a new visit
  createVisit(visitor: Visitor5): Observable<Visitor5> {
    return this.http.post<Visitor5>(this.apiUrl, visitor).pipe(
      catchError(this.handleError)
    );
  }

  // ✅ Get a visit by ID
  getVisitById(id: number): Observable<Visitor5> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Visitor5>(url).pipe(
      catchError(this.handleError)
    );
  }

  // ✅ Update a visit
  updateVisit(id: number, visitor: Visitor5): Observable<Visitor5> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Visitor5>(url, visitor).pipe(
      catchError(this.handleError)
    );
  }

  // ✅ Delete a visit
  deleteVisit(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }

  // ✅ Error handler
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