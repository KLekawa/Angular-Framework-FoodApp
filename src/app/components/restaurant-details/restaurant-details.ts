import { Component, inject, input } from '@angular/core';
import { RestaurantsService } from '../../services/restaurants-service';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-restaurant-details',
  styleUrl: './restaurant-details.scss',
  templateUrl: './restaurant-details.html',
})
export class RestaurantDetails {
  restaurantsService = inject(RestaurantsService);
  readonly id = input.required<string>();

  restaurant = this.restaurantsService.selectedRestaurant;


  ngOnInit() {
    this.restaurantsService.GetById(Number(this.id()));
  }
}
