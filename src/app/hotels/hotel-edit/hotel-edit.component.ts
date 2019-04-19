import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../hotel.service';
import { Hotel } from '../hotel';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.less']
})
export class HotelEditComponent implements OnInit {
  hotel: Hotel;
  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.hotelService.getHotel(id).subscribe(
      (hotel: Hotel) => this.hotel = hotel
    ); 
  }

}
