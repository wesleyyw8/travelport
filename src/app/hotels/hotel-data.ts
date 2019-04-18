import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Hotel } from './hotel';

export class HotelData implements InMemoryDbService {

  createDb() {
    const hotels: Hotel[] = [
      {
        'id': 1,
        'hotelName': 'Hotel Express',
        'hotelAddress': 'Temple bar 11,',
        'hotelCity': 'Dublin',
        'hotelPhoneNumber': 123123123,
        'hotelStars': 4
      },
      {
        'id': 2,
        'hotelName': 'Hilton',
        'hotelAddress': 'Oconnel st 123,',
        'hotelCity': 'Dublin',
        'hotelPhoneNumber': 512512,
        'hotelStars': 5
      },
      {
        'id': 3,
        'hotelName': 'Palace',
        'hotelAddress': 'Gardiner st 31',
        'hotelCity': 'Spain',
        'hotelPhoneNumber': 89889,
        'hotelStars': 3
      }
    ];
    return { hotels };
  }
}
