import { Component, inject } from '@angular/core';
import { Menu } from '../../services/menu';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-restaurant-menu',
  styleUrl: './restaurant-menu.scss',
  templateUrl: './restaurant-menu.html',
})
export class RestaurantMenu {
  menuService = inject(Menu);

  categories = this.menuService.getCategories();
}
