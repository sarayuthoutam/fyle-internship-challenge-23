// src/app/services/github.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl: string = 'https://api.github.com/users';

  constructor(private http: HttpClient) { }

  getRepos(username: string, perPage: number, page: number): Observable<any> {
    const params = new HttpParams()
      .set('per_page', perPage.toString())
      .set('page', page.toString());

    return this.http.get<any[]>(`${this.apiUrl}/${username}/repos`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      return throwError('User not found');
    } else {
      return throwError('An error occurred');
    }
  }
}
