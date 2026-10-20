import { Component, inject, model, signal } from '@angular/core';
import { RestaurantCard } from '../restaurant-card/restaurant-card';
import { form, FormField } from '@angular/forms/signals';
import { Restaurant } from '../../models/restaurant.model';
import { Restaurants } from '../../services/restaurants';

@Component({
  imports: [RestaurantCard, FormField],
  selector: 'app-restaurant-list',
  styleUrl: './restaurant-list.scss',
  templateUrl: './restaurant-list.html',
})
export class RestaurantList {
  restaurantsService = inject(Restaurants);
  private restaurants = this.restaurantsService.getAll();

  searchForm = signal({
    nameSearch: "",
    cuisine: "All",
    active: "All",
    sortOption: "None",
    minimumOrderVal: ""
  });

  private form = form(this.searchForm);
  private itemsFound = signal(this.restaurants().length);

  updateRestaurantData() {
    let newData = this.restaurantsService.getAll()().filter(r => r.name.toLowerCase().includes((this.searchForm().nameSearch).toLowerCase()));
    if(this.searchForm().cuisine !== "All"){
      newData = newData.filter(r => r.cuisine == this.searchForm().cuisine);
    }
    if(this.searchForm().active !== "All"){
      newData = newData.filter(r => r.isActive);
    }

    if(this.searchForm().minimumOrderVal !== ""){
      const amount = Number(this.searchForm().minimumOrderVal);
      newData = newData.filter(r => 
        r.minimumOrderValue !== null && 
        r.minimumOrderValue <= amount
      );
    }

    if(this.searchForm().sortOption === "rating"){
      newData.sort((a,b) => (b.rating ?? 0) - (a.rating ?? 0));
    }
    if(this.searchForm().sortOption === "deliveryTime"){
      newData.sort((a,b) => (a.deliveryTimeMin ?? 0) - (b.deliveryTimeMin ?? 0));
    }
    if(this.searchForm().sortOption === "deliveryFee"){
      newData.sort((a,b) => (a.deliveryFee ?? 0) - (b.deliveryFee ?? 0));
    }

    this.itemsFound = signal(newData.length);
    this.restaurants.set(newData as Restaurant[])
  }

}
