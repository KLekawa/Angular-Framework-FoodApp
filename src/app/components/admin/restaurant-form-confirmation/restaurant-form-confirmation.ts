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

  restaurant = computed(() =>{
    // const id = this.id();
    // if(id === undefined) 
    //   return undefined;
    
    return this.restaurantsService.GetById(Number(this.id()));
  }) 


  Deactivate(id:number | null){
    if(id ===null){
      return;
    }

    this.restaurantsService.ChangeStatus(id);
    this.router.navigate(['/admin/restaurants']);
  }
}
