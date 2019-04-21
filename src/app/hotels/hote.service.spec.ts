import {HotelService} from './hotel.service';

describe('hotel service', () => {
  let service: HotelService
  let mockHttp;
  let hotels;
  beforeEach(() => {
    hotels.hotels
    mockHttp = jasmine.createSpy()
    service = new HotelService(mockHttp);
  })
  it('should delete', () => {
    service.hotels = [
      {
        id: 1,
        hotelName: 'Hotel Express',
        hotelAddress: 'Temple bar 11',
        hotelCity: 'Dublin',
        hotelPhoneNumber: 123123,
        hotelStars: 4
      },
      {
        id: 2,
        hotelName: 'Hilton',
        hotelAddress: 'Oconnel st 123',
        hotelCity: 'Dublin',
        hotelPhoneNumber: 512512,
        hotelStars: 5
      },
      {
        id: 3,
        hotelName: 'Palace',
        hotelAddress: 'Gardiner st 31',
        hotelCity: 'Spain',
        hotelPhoneNumber: 89889,
        hotelStars: 3
      }
    ];
    service.deleteHotel(3);
    expect(service.hotels.length).toEqual(2);
  })
})