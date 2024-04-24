import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  create<T>(uri: string, data: T): Observable<T> {
    return this.http.post<T>(`${this.API_URL}/${uri}`, data);
  }

  get<T>(uri: string): Observable<T> {
    return this.http.get<T>(`${this.API_URL}/${uri}`);
  }

  getById<T>(uri: string, id: string): Observable<T> {
    return this.http.get<T>(`${this.API_URL}/${uri}/${id}`);
  }

  update<T>(uri: string, id: string, data: T): Observable<T> {
    return this.http.patch<T>(`${this.API_URL}/${uri}/${id}`, data);
  }

  delete<T>(uri: string, id: string): Observable<T> {
    return this.http.delete<T>(`${this.API_URL}/${uri}/${id}`);
  }
}
