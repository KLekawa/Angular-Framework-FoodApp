import { Component, inject, input, signal } from '@angular/core';
import { Restaurant } from '../../../models/restaurant.model';
import { form, max, min, minLength, required, validate, FormField } from '@angular/forms/signals';
import { Restaurants } from '../../../services/restaurants';
import { Router } from '@angular/router';


type RestaurantFormData = Omit<Restaurant, 'id' | 'rating' | 'imageUrl'> & {imageUrl: string};

@Component({
  imports: [FormField],
  selector: 'app-restaurant-form',
  styleUrl: './restaurant-form.scss',
  templateUrl: './restaurant-form.html',
})
export class RestaurantForm {
  private router = inject(Router);
  mode = input<'add' | 'edit'>();
  id = input<string>();
  restaurantsService = inject(Restaurants);

  restaurant = signal<RestaurantFormData>({
    name: '',
    description: '',
    cuisine: '',
    imageUrl: '',
    deliveryTimeMin: null,
    deliveryTimeMax: null,
    deliveryFee: null,
    minimumOrderValue: null,
    address: '',
    isActive: true
  })

  buttonClick(){
    if(this.form().invalid()){
      console.log('Formularz niepoprawny');
      return;
    }
    
    if(this.mode() === 'add'){
      let maxId = this.restaurantsService.getAll()().reduce(
        (max, restaurant) => Math.max(max, restaurant.id ?? 0),
        0
      );
      const newId = maxId +1;
      let newRestaurant: Restaurant ={
        ...this.restaurant(),
        id: newId,
        rating: null
      }
      this.restaurantsService.add(newRestaurant);
      this.router.navigate(['/admin/restaurant', newId]);
    } else if(this.mode() === 'edit'){
        let newRestaurant: Restaurant ={
        ...this.restaurant(),
        id: Number(this.id),
        rating: null
      }
      this.restaurantsService.editRestaurant(newRestaurant);
      this.router.navigate(['/admin/restaurant', this.id]);
    }
  }

  form = form(this.restaurant, (schema) =>{
    required(schema.name);

    required(schema.description);
    minLength(schema.description, 40, {
      error: {kind: 'minLength', message: "Opis musi mieć min 40 znaków!"},
    });

    required(schema.deliveryTimeMin);
    min(schema.deliveryTimeMin, 10, {
      error: {kind: 'min', message: 'Minimalny czas dostawy musi wynosić co najmniej 10 minut'}
    });
    max(schema.deliveryTimeMin, 60, {
      error: {kind: "max", message: "Minimalny czas dostawy musi wynosić maksymalnie 60 minut"}
    });

    required(schema.deliveryTimeMax);
    min(schema.deliveryTimeMax, 10, {
      error: {kind: 'min', message: 'Maksymalny czas dostawy musi wynosić co najmniej 10 minut'}
    });
    max(schema.deliveryTimeMax, 60, {
      error: {kind: 'max', message: 'Maksymalny czas dostawy musi wynosić maksymalnie 60 minut'}
    });

    validate(schema.deliveryTimeMax, ({ value, valueOf}) => {
      const minTime = valueOf(schema.deliveryTimeMin);
      const maxTime = value();

      if(minTime === null || maxTime === null)
        return null;

      if(maxTime < minTime){
        return{
          kind: "invalidTimeRange",
          message: 'Maksymalny czas dostawy nie może być krótszy niż minimalny'
        };
      }
      return null;
    });

    required(schema.deliveryFee);
    min(schema.deliveryFee, 0, {
      error: {kind: 'min', message: 'Minimalny koszt dostawy musi wynosić co najmniej 0'}
    });
    max(schema.deliveryFee, 100, {
      error: {kind: 'max', message: 'Minimalny koszt dostawy musi wynosić maksymalnie  100'}
    });

    required(schema.minimumOrderValue);
    min(schema.minimumOrderValue, 0, {
      error: {kind: 'min', message: 'Minimalny koszt zamówienia musi wynosić co najmniej 0'}
    });
    max(schema.minimumOrderValue, 100, {
      error: {kind: 'max', message: 'Minimalny koszt zamówienia musi wynosić maksymalnie  100'}
    });

    required(schema.address);
  })
}
