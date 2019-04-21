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
  public hotels: Hotel[];
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
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
      map((hotels: Hotel[]) => hotels.find(p => p.id === id))
    );
  }
  createHotel(hotel: Hotel): Observable<Hotel> {
    if (this.hotels.length === 0) {
      hotel.id = 1;
    } else {
      hotel.id = null;
    }
    return this.http.post<Hotel>(this.hotelsUrl, hotel, { headers: this.headers })
      .pipe(
        tap(data => console.log('createHotel: ' + JSON.stringify(data))),
        tap(data => {
          this.hotels.push(data);
        }),
        catchError(this.handleError)
      );
  }
  updateHotel(hotel: Hotel): Observable<Hotel> {
    const url = `${this.hotelsUrl}/${hotel.id}`;
    return this.http.put<Hotel>(url, hotel, { headers: this.headers })
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
  deleteHotel(id: number): Observable<{}> {
    const url = `${this.hotelsUrl}/${id}`;
    return this.http.delete<Hotel>(url, { headers: this.headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
        tap(data => {
          const foundIndex = this.hotels.findIndex(item => item.id === id);
          if (foundIndex > -1) {
            this.hotels.splice(foundIndex, 1);
          }
        }),
        catchError(this.handleError)
      );
  }
  private handleError(err) {
    console.error(err);
    return throwError(err);
  }
}
