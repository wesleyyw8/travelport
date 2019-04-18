import { Injectable } from '@angular/core';
import { Hotel } from './hotel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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
        tap(data => console.log(JSON.stringify(data))),
        tap(data => this.hotels = data)
        //catchError(this.handleError)
      );
  }
}
