import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { House } from '../models/house.model';

@Injectable({ providedIn: 'root' })
export class HouseService {
  private apiUrl = 'http://localhost:3000/houses';

  constructor(private http: HttpClient) {}

  getHouses(): Observable<House[]> {
    return this.http.get<House[]>(this.apiUrl);
  }

  getHouse(id: number): Observable<House> {
    return this.http.get<House>(`${this.apiUrl}/${id}`);
  }

  addHouse(house: House): Observable<House> {
    return this.http.post<House>(this.apiUrl, house);
  }

  deleteHouse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateHouse(id: number, data: Partial<House>): Observable<House> {
    return this.http.patch<House>(`${this.apiUrl}/${id}`, data);
  }
}
