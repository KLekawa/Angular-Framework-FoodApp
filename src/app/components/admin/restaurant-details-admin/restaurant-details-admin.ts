import { Component, computed, inject, input } from '@angular/core';
import { RestaurantsService } from '../../../services/restaurants-service';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-restaurant-details-admin',
  styleUrl: './restaurant-details-admin.scss',
  templateUrl: './restaurant-details-admin.html',
})
export class RestaurantDetailsAdmin {
    restaurantsService = inject(RestaurantsService);
  readonly id = input.required<string>();

  restaurant = computed( () =>{
    return this.restaurantsService.GetById(Number(this.id()))
  })
}
