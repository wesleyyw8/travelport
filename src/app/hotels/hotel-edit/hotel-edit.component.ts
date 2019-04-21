import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../hotel.service';
import { Hotel } from '../hotel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.less']
})
export class HotelEditComponent implements OnInit, OnDestroy {
  hotel: Hotel;
  hotelForm: FormGroup;
  errorMessage: string;
  displayMessage: { [key: string]: string } = {};
  private validationMessages: {};
  getHotelSub: Subscription;
  pageTitle: string;

  constructor(
    private formBuilder: FormBuilder,
    private hotelService: HotelService,
    private router: Router,
    private route: ActivatedRoute) {
    this.validationMessages = {
      hotelName: {
        required: 'hotel name is required.',
        minlength: 'hotel name must be at least three characters.',
        maxlength: 'hotel name cannot exceed 50 characters.'
      },
      hotelAddress: {
        required: 'hotel name is required.',
        minlength: 'hotel name must be at least three characters.',
        maxlength: 'hotel name cannot exceed 50 characters.'
      },
      hotelCity: {
        required: 'hotel name is required.',
        minlength: 'hotel name must be at least three characters.',
        maxlength: 'hotel name cannot exceed 50 characters.'
      },
      hotelPhoneNumber: {
        required: 'hotel name is required.'
      },
      hotelStars: {
        range: 'Rate the hotel between 1 (lowest) and 5 (highest).'
      }
    };
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.hotelForm = this.formBuilder.group({
      hotelName: ['', Validators.required],
      hotelAddress: ['', [Validators.required]],
      hotelPhoneNumber: ['', [Validators.required]],
      hotelStars: ['', [Validators.required]],
      hotelCity: ['', [Validators.required]]
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
    }
    else {
      this.pageTitle = 'Add Hotel';
    }
  }
  blur(): void {
    // this.displayMessage = this.genericValidator.processMessages(this.hotelForm);
  }

  ngOnDestroy(): void {
    this.getHotelSub.unsubscribe();
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
            (err: any) => this.errorMessage = err.error
          );
        } else {
          this.hotelService.updateHotel(p).subscribe(
            (hotel) => {
              console.log('hotel updated', hotel);
              this.router.navigateByUrl('/hotels');
            },
            (err: any) => this.errorMessage = err.error
          );
        }
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }
}
