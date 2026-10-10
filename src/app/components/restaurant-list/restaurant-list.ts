import { Component, model, signal } from '@angular/core';
import { RestaurantCard } from '../restaurant-card/restaurant-card';
import data from '../../../data/restaurants.json'
import { form, FormField } from '@angular/forms/signals';
import { Restaurant } from '../../models/restaurant.model';

@Component({
  imports: [RestaurantCard, FormField],
  selector: 'app-restaurant-list',
  styleUrl: './restaurant-list.scss',
  templateUrl: './restaurant-list.html',
})
export class RestaurantList {
  private restaurants = signal(data as Restaurant[]);

  searchForm = signal({
    nameSearch: ""
  });

  private form = form(this.searchForm);

  updateRestaurantData() {
    
    const newData = data.filter(r => r.name.toLowerCase().includes((this.searchForm().nameSearch).toLowerCase()));
    this.restaurants.set(newData as Restaurant[])
  }
}
