import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  private apiUrl = 'http://localhost:3000/favorites';

  constructor(private http: HttpClient) {}

  getUserFavorites(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?userId=${userId}`);
  }

  addFavorite(userId: number, houseId: number): Observable<any> {
    return this.http.post<any>(this.apiUrl, { userId, houseId });
  }

  removeFavorite(favId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${favId}`);
  }

  checkFavorite(userId: number, houseId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}?userId=${userId}&houseId=${houseId}`
    );
  }
  isFavorite(userId: number, houseId: number): Observable<boolean> {
    return this.checkFavorite(userId, houseId).pipe(
      map(favs => favs.length > 0)
    );
  }
}
