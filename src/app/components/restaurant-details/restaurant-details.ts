import { Component, computed, inject, input } from '@angular/core';
import { Restaurants } from '../../services/restaurants';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-restaurant-details',
  styleUrl: './restaurant-details.scss',
  templateUrl: './restaurant-details.html',
})
export class RestaurantDetails {
  restaurantsService = inject(Restaurants);
  readonly id = input.required<string>();

  restaurant = computed( () =>{
    return this.restaurantsService.getById(Number(this.id()))
  })
}
