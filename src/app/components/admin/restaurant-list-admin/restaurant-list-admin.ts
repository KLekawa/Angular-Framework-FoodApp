import { Component, inject, signal } from '@angular/core';
import { RestaurantsService } from '../../../services/restaurants-service';
import { RestaurantCardAdmin } from '../restaurant-card-admin/restaurant-card-admin';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RestaurantCardAdmin, RouterLink],
  selector: 'app-restaurant-list-admin',
  styleUrl: './restaurant-list-admin.scss',
  templateUrl: './restaurant-list-admin.html',
})
export class RestaurantListAdmin {
  restaurantsService = inject(RestaurantsService);
  private restaurants = this.restaurantsService.restaurants;
  private loading = this.restaurantsService.isLoading;
  private error = this.restaurantsService.error;

  private itemsFound = signal(this.restaurants().length);

}
