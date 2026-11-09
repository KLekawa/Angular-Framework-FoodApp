import { Component, inject, model } from '@angular/core';
import { Restaurant } from '../../../models/restaurant.model';
import { RouterLink } from '@angular/router';
import { RestaurantsService } from '../../../services/restaurants-service';

@Component({
  imports: [RouterLink],
  selector: 'app-restaurant-card-admin',
  styleUrl: './restaurant-card-admin.scss',
  templateUrl: './restaurant-card-admin.html',
})
export class RestaurantCardAdmin {
  restaurantsService = inject(RestaurantsService);
  
   restaurant = model<Restaurant>({
    id: null,
    name: "",
    description: "",
    cuisine: "",
    imageUrl: "",
    rating: null,
    deliveryTimeMin: null,
    deliveryTimeMax: null,
    deliveryFee: null,
    minimumOrderValue: null,
    address: '',
    isActive: null
  });
}
