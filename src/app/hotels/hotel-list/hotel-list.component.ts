import { Component, OnInit } from '@angular/core';
import { HotelService } from '../hotel.service';
import { Hotel } from '../hotel';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.less']
})
export class HotelListComponent implements OnInit {
  errorMessage: string;
  hotels: Hotel[];
  constructor(private hotelService: HotelService) { }

  ngOnInit() {
    this.hotelService.getHotels().subscribe(
      (hotels: Hotel[]) => this.hotels = hotels,
      (err: any) => this.errorMessage = err.error
    );
  }

}
