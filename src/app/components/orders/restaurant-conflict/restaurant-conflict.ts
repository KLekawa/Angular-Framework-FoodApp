import { Component, inject } from '@angular/core';
import { CartService } from '../../../services/cart-service';

@Component({
  imports: [],
  selector: 'app-restaurant-conflict',
  styleUrl: './restaurant-conflict.scss',
  templateUrl: './restaurant-conflict.html',
})
export class RestaurantConflict {
  cartService = inject(CartService);
}
