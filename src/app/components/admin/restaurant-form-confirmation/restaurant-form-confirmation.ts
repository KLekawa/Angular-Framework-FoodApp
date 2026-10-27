import { Component, computed, inject, input, model } from '@angular/core';
import { Restaurant } from '../../../models/restaurant.model';
import { Router, RouterLink } from '@angular/router';
import { Restaurants } from '../../../services/restaurants';

@Component({
  imports: [RouterLink],
  selector: 'app-restaurant-form-confirmation',
  styleUrl: './restaurant-form-confirmation.scss',
  templateUrl: './restaurant-form-confirmation.html',
})
export class RestaurantFormConfirmation {
  restaurantsService = inject(Restaurants);
    private router = inject(Router);
  id = input();

  restaurant = computed(() =>{
    // const id = this.id();
    // if(id === undefined) 
    //   return undefined;
    
    return this.restaurantsService.getById(Number(this.id()));
  }) 


  Deactivate(id:number | null){
    if(id ===null){
      return;
    }

    this.restaurantsService.changeStatus(id);
    this.router.navigate(['/admin/restaurants']);
  }
}
