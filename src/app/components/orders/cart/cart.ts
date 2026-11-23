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
  restaurantLoading = this.restaurantService.detailsLoading;
  restaunratError = this.restaurantService.detailsError;

  restaurantDeliveryFee = computed (() =>{
    return this.restaurantService.selectedRestaurant()?.deliveryFee;
  }) 

  restaurantName = computed (() =>{
    return this.restaurantService.selectedRestaurant()?.name;
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

  ngOnInit(){
    const cart = this.cart();

    if(cart === null)
      return;

    this.restaurantService.GetById(cart.restaurantId);
    this.menuService.GetCategoriesById(cart.restaurantId);
  }
}
