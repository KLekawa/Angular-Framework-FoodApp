import { Component, computed, inject, signal } from '@angular/core';
import { CartService } from '../../../services/cart-service';
import { MenuService } from '../../../services/menu-service';
import { DecimalPipe } from '@angular/common';
import { RestaurantsService } from '../../../services/restaurants-service';
import { RouterLink } from '@angular/router';


@Component({
  imports: [DecimalPipe, RouterLink],
  selector: 'app-cart',
  styleUrl: './cart.scss',
  templateUrl: './cart.html',
})
export class Cart {
  cartService = inject(CartService);
  menuService = inject(MenuService);
  private restaurantService = inject(RestaurantsService);

  restaurantDeliveryFee = computed (() =>{
    const restaurantId = this.cart()?.restaurantId;
    if(restaurantId === undefined || restaurantId === null)
      return undefined

    return this.restaurantService.GetById(restaurantId)?.deliveryFee;
  }) 

  restaurantName = computed (() =>{
    const restaurantId = this.cart()?.restaurantId;
    if(restaurantId === undefined || restaurantId === null)
      return undefined

    return this.restaurantService.GetById(restaurantId)?.name;
  }) 
  
  cart = computed(() => this.cartService.GetCart()); 

  DecreaseQuantity(productid: number){
    const quantity = this.cart()?.items.find(i => i.productId === productid)?.quantity;

    this.cartService.ChangeQuantity(productid, Number(quantity)-1);
  }

  IncreaseQuantity(productid: number){
    const quantity = this.cart()?.items.find(i => i.productId === productid)?.quantity;

    this.cartService.ChangeQuantity(productid, Number(quantity)+1);
  }

}
