import { FormBuilder } from '@angular/forms';
import {HotelEditComponent} from './hotel-edit.component';
import { of } from 'rxjs';
import { TestBed, ComponentFixture } from '@angular/core/testing';

describe('hotel component', () => {
  let component: HotelEditComponent
  let mockHttp;
  let mockFormBuilder;
  let mockHotelService;
  let mockRouter;
  let mockActivatedRoute;
  beforeEach(() => {
    spyOn(window, 'confirm').and.callFake(() => {
      return true;
    });
    mockHttp = jasmine.createSpy()
    mockFormBuilder = jasmine.createSpy('');
    
    mockHotelService = jasmine.createSpyObj('HotelService', {
      deleteHotel: of(''),
      createHotel: of({a: 3})
    });
    mockRouter = jasmine.createSpy();
    mockActivatedRoute = jasmine.createSpy();
    component = new HotelEditComponent(mockFormBuilder, mockHotelService, mockRouter, mockActivatedRoute);
  });
  it('should delete', () => {
    component.hotel = {
      id: 3,
      hotelName: 'test2',
      hotelAddress: 'test',
      hotelCity: 'test1223',
      hotelPhoneNumber: 123,
      hotelStars: 2
    };
    component.deleteHotel();
    expect(mockHotelService.deleteHotel).toHaveBeenCalled();
  });
})