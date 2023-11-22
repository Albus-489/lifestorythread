import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IComment } from '../models/IComment';
import { IDayDB } from '../models/IDayDB';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiURLdays: string = 'http://localhost:8080/days/';
  constructor(private http: HttpClient) { }

  getComments(): Observable<IComment[]> {
    return this.http.get<IComment[]>(this.apiURLdays);
  }

  getCurrentMonth(date: string = '2023-05'): Observable<IDayDB[]> {
    return this.http.get<IDayDB[]>(this.apiURLdays + date)
  }
}
