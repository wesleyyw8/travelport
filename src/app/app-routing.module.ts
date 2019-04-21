import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './main/page-not-found.component';
import { HotelListComponent } from './hotels/hotel-list/hotel-list.component';
import { HotelEditComponent } from './hotels/hotel-edit/hotel-edit.component';

const routes: Routes = [{
  path: '',
  component: MainComponent
}, {
  path: 'hotels',
  component: HotelListComponent
},
{
  path: 'hotels/edit/:id',
  component: HotelEditComponent
},
{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
