import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { House } from '../models/house.model';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private baseUrl = 'http://localhost:4000/houses'; // NO /api

  constructor(private http: HttpClient) {}

getByOwner(ownerId: number): Observable<House[]> {
  return this.http.get<House[]>(`${this.baseUrl}?ownerId=${ownerId}`);
}

  getOne(id: any): Observable<House> {
    return this.http.get<House>(`${this.baseUrl}/${id}`);
  }

  create(house: any): Observable<House> {
    return this.http.post<House>(this.baseUrl, house);
  }

  update(id: any, house: House): Observable<House> {
    return this.http.put<House>(`${this.baseUrl}/${id}`, house);
  }

  delete(id: any): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
    // Add these inside the class
  getAll(): Observable<House[]> {
    return this.http.get<House[]>(this.baseUrl);
  }

  getContactMessages(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:4000/messages');
  }
}