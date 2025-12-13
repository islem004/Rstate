// favorite.service.ts - FULL READY-TO-PASTE
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = 'http://localhost:4000/favorites';

  constructor(private http: HttpClient) {}

  getUserFavorites(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?userId=${userId}`);
  }

  addFavorite(userId: number, houseId: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, {
      userId,
      houseId,
      id: Date.now().toString() // json-server needs an id
    });
  }

  removeFavorite(favId: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${favId}`);
  }

  isFavorite(userId: number, houseId: any): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}?userId=${userId}&houseId=${houseId}`).pipe(
      map(favs => favs.length > 0)
    );
  }

  getFavoriteRecordId(userId: number, houseId: any): Observable<string | null> {
    return this.http.get<any[]>(`${this.apiUrl}?userId=${userId}&houseId=${houseId}`).pipe(
      map(favs => favs.length > 0 ? favs[0].id : null)
    );
  }
}