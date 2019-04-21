import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../hotel.service';
import { Hotel } from '../hotel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { createOfflineCompileUrlResolver } from '@angular/compiler';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.less']
})
export class HotelEditComponent implements OnInit, OnDestroy {
  hotel: Hotel;
  hotelForm: FormGroup;
  errorMessage: string;
  getHotelSub: Subscription;
  pageTitle: string;

  constructor(
    private formBuilder: FormBuilder,
    private hotelService: HotelService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.hotelForm = this.formBuilder.group({
      hotelName:  ['', [Validators.required,
        Validators.minLength(3)]],
      hotelAddress:  ['', [Validators.required,
        Validators.minLength(3)]],
      hotelPhoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{3,12}')]],
      hotelStars: ['', [Validators.required, Validators.pattern('[1-5]{1}')]],
      hotelCity: ['', [Validators.required, Validators.minLength(3),
      Validators.maxLength(50)]]
    });

    this.getHotelSub = this.hotelService.getHotel(id).subscribe(
      (hotel: Hotel) => this.displayHotel(hotel)
    );
  }
  displayHotel(hotel: Hotel | null): void {
    this.hotel = hotel;

    if (this.hotel) {
      this.pageTitle = 'Edit Hotel';
      // Reset the form back to pristine
      this.hotelForm.reset();
      // Update the data on the form
      this.hotelForm.patchValue({
        id: this.hotel.id,
        hotelName: this.hotel.hotelName,
        hotelAddress: this.hotel.hotelAddress,
        hotelCity: this.hotel.hotelCity,
        hotelPhoneNumber: this.hotel.hotelPhoneNumber,
        hotelStars: this.hotel.hotelStars
      });
    } else {
      this.pageTitle = 'Add Hotel';
    }
  }

  ngOnDestroy(): void {
    this.getHotelSub.unsubscribe();
  }
  deleteHotel(): void {
    if (this.hotel) {
      if (confirm(`Are you sure that you want to delete the hotel with the id: ${this.hotel.id}?`)) {
        this.hotelService.deleteHotel(this.hotel.id).subscribe(
          () => {
            console.log('hotel deleted sucessful');
            this.router.navigateByUrl('/hotels');
          },
          (err: any) => this.errorMessage = err.error
        );
      }
    }
  }
  saveHotel(): void {
    if (this.hotelForm.valid) {
      if (this.hotelForm.dirty) {
        const p = { ...this.hotel, ...this.hotelForm.value };
        if (!p.id) {
          this.hotelService.createHotel(p).subscribe(
            hotel => {
              console.log('hotel created sucessfful', hotel);
              this.router.navigateByUrl('/hotels');
            },
            (err: any) => this.errorMessage = err.statusText
          );
        } else {
          this.hotelService.updateHotel(p).subscribe(
            (hotel) => {
              console.log('hotel updated', hotel);
              this.router.navigateByUrl('/hotels');
            },
            (err: any) => this.errorMessage = err.statusText

          );
        }
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }
}
