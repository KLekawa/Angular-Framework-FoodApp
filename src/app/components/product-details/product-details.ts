import { Component, computed, inject, input } from '@angular/core';
import { Menu } from '../../services/menu';

@Component({
  imports: [],
  selector: 'app-product-details',
  styleUrl: './product-details.scss',
  templateUrl: './product-details.html',
})
export class ProductDetails {
  private menu = inject(Menu);
  readonly id = input.required<string>();

  product = computed( () =>{
    return this.menu.getProductDetails(Number(this.id()))
  })
}
