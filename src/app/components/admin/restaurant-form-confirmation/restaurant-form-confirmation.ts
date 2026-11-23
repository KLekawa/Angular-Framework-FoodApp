import { Component, computed, inject, input, model } from '@angular/core';
import { Restaurant } from '../../../models/restaurant.model';
import { Router, RouterLink } from '@angular/router';
import { RestaurantsService } from '../../../services/restaurants-service';

@Component({
  imports: [RouterLink],
  selector: 'app-restaurant-form-confirmation',
  styleUrl: './restaurant-form-confirmation.scss',
  templateUrl: './restaurant-form-confirmation.html',
})
export class RestaurantFormConfirmation {
  restaurantsService = inject(RestaurantsService);
  private router = inject(Router);
  id = input();

  restaurant = this.restaurantsService.selectedRestaurant;


  Deactivate(id:number | null){
    if(id ===null){
      return;
    }

   const request = this.restaurantsService.ChangeStatus(id);
   if(!request) return;

   request.subscribe({
      next: updatedRestaurant => {
        this.restaurantsService.UpdateSelectedRestaurant(updatedRestaurant);
        this.restaurantsService.Reload();
        this.router.navigate(['/admin/restaurants']);
      },
      error: err =>{
        console.error('Failed to change restaurant status: ', err)
      }
    });
  }

  ngOnInit(){
    this.restaurantsService.GetById(Number(this.id()));
  }
}
