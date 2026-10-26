import { Component, inject, signal } from '@angular/core';
import { Restaurants } from '../../../services/restaurants';
import { RestaurantCard } from '../../restaurant-card/restaurant-card';
import { RestaurantCardAdmin } from '../restaurant-card-admin/restaurant-card-admin';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RestaurantCardAdmin, RouterLink],
  selector: 'app-restaurant-list-admin',
  styleUrl: './restaurant-list-admin.scss',
  templateUrl: './restaurant-list-admin.html',
})
export class RestaurantListAdmin {
  restaurantsService = inject(Restaurants);
  private restaurants = this.restaurantsService.getAll();

  private itemsFound = signal(this.restaurants().length);

}
