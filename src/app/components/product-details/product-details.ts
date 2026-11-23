import { Component, computed, inject, input } from '@angular/core';
import { MenuService } from '../../services/menu-service';
import { CartService } from '../../services/cart-service';

@Component({
  imports: [],
  selector: 'app-product-details',
  styleUrl: './product-details.scss',
  templateUrl: './product-details.html',
})
export class ProductDetails {
  private menuService = inject(MenuService);
  cartService = inject(CartService);

  restaurantId = input<string>();
  productId  = input<string>();

  product = this.menuService.selectedProduct;

   AddToCart(productId: number){
    this.cartService.AddToCart(Number(this.restaurantId()), productId);
  }

  ngOnInit(){
    const restaurantId = this.restaurantId();
    const productId = this.productId();

    if (restaurantId === undefined || productId === undefined)
      return undefined;

    this.menuService.GetProductDetails(Number(this.restaurantId()), Number(this.productId()))
  }
}
