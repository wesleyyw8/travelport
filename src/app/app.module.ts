import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './main/page-not-found.component';
import { MenuComponent } from './main/menu.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HotelListComponent } from './hotels/hotel-list/hotel-list.component';
import { HotelData } from './hotels/hotel-data';
import { HttpClientModule } from '@angular/common/http';
import { HotelEditComponent } from './hotels/hotel-edit/hotel-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PageNotFoundComponent,
    MenuComponent,
    HotelListComponent,
    HotelEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(HotelData),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
