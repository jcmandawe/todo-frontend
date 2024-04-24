import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, lastValueFrom, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_URL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  get headers() {
    return { headers: { 'Content-Type': 'application/json' } };
  }

  async create<T>(uri: string, data: T): Promise<T> {
    return await this.handlePromiseRequest<T>(this.httpClient.post<T>(`${this.API_URL}/${uri}`, data, this.headers));
  }

  async get<T>(uri: string): Promise<T> {
    return await this.handlePromiseRequest<T>(this.httpClient.get<T>(`${this.API_URL}/${uri}`, this.headers));
  }

  async getById<T>(uri: string, id: string): Promise<T> {
    return await this.handlePromiseRequest<T>(this.httpClient.get<T>(`${this.API_URL}/${uri}/${id}`, this.headers));
  }

  async update<T>(uri: string, id: string, data: T): Promise<T> {
    return await this.handlePromiseRequest<T>(this.httpClient.patch<T>(`${this.API_URL}/${uri}/${id}`, data, this.headers));
  }

  async delete<T>(uri: string, id: string): Promise<T> {
    return await this.handlePromiseRequest<T>(this.httpClient.delete<T>(`${this.API_URL}/${uri}/${id}`, this.headers));
  }

  private handlePromiseRequest<T>(request: Observable<T>): Promise<T> {
    return lastValueFrom(request.pipe(catchError(this.handleError)));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }
}
