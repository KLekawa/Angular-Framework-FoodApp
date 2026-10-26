import { Component, model } from '@angular/core';
import { form } from '@angular/forms/signals';
import { Restaurant } from '../../models/restaurant.model';
import { RouterLink } from '@angular/router';


@Component({
  imports: [RouterLink],
  selector: 'app-restaurant-card',
  styleUrl: './restaurant-card.scss',
  templateUrl: './restaurant-card.html',
})
export class RestaurantCard {
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
