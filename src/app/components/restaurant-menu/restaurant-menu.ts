import { Component, computed, inject, input } from '@angular/core';
import { MenuService } from '../../services/menu-service';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart-service';

@Component({
  imports: [RouterLink],
  selector: 'app-restaurant-menu',
  styleUrl: './restaurant-menu.scss',
  templateUrl: './restaurant-menu.html',
})
export class RestaurantMenu {
  menuService = inject(MenuService);
  cartService = inject(CartService);
  id = input<string>();

  categories = this.menuService.categoriesOfRestaurant;

  AddToCart(productId: number){
    this.cartService.AddToCart(Number(this.id()), productId);
  }

  ngOnInit(){
    const id = this.id();

    if(id === undefined)
      return undefined;

    this.menuService.GetCategoriesById(Number(id))
  }
}
