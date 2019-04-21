import { Injectable } from '@angular/core';
import { Hotel } from './hotel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private hotelsUrl = 'api/hotels';
  private hotels: Hotel[];
  constructor(private http: HttpClient) { }
  getHotels(): Observable<Hotel[]> {
    if (this.hotels) {
      return of(this.hotels);
    }
    return this.http.get<Hotel[]>(this.hotelsUrl)
      .pipe(
        tap(data => this.hotels = data),
        catchError(this.handleError)
      );
  }
  getHotel(id: number): Observable<Hotel | undefined> {
    return this.getHotels().pipe(
      map((hotels: Hotel[]) => hotels.find(p => p.id == id))
    );
  }

  updateHotel(hotel: Hotel): Observable<Hotel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.hotelsUrl}/${hotel.id}`;
    return this.http.put<Hotel>(url, hotel, { headers })
      .pipe(
        tap(() => console.log('updateHotel: ' + hotel.id)),
        tap(() => {
          const foundIndex = this.hotels.findIndex(item => item.id === hotel.id);
          if (foundIndex > -1) {
            this.hotels[foundIndex] = hotel;
          }
        }),
        // Return the product on an update
        map(() => hotel),
        catchError(this.handleError)
      );
  }
  private handleError(err) {
    console.error(err);
    return throwError(err);
  }
}
