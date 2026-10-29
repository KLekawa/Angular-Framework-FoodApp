import { inject, Service, signal } from '@angular/core';
import { Restaurant } from '../models/restaurant.model';
import dataJson from './../../data/restaurants.json';
import { LocalStorageService } from '../local-storage-service';


@Service()
export class Restaurants {
    private data = signal<Restaurant[]>([]);
    storageService = inject(LocalStorageService);

    constructor() {
        this.initializeRestaurants();
    }


    getAll(){
        return this.data;
    }

    getById(id: number){
        return this.data().find(r => r.id === id);
    }

    add(restaurant: Restaurant){
        this.data.update(restaurants => [...restaurants, restaurant]);
        this.storageService.saveToLocalStorage('restaurants', this.data());
    }
    
    editRestaurant(restaurant: Restaurant){
        this.data.update(restaurants =>
            restaurants.map(r =>
                r.id === restaurant.id ? restaurant : r
            )
        );

        this.storageService.saveToLocalStorage('restaurants', this.data());
    }

    changeStatus(id: number){
        this.data.update(restaurants =>
            restaurants.map(r =>
                r.id === id ? {...r, isActive: !r.isActive} : r
            )
        );

        this.storageService.saveToLocalStorage('restaurants', this.data());
    }

        private initializeRestaurants(){
        const storedData = this.storageService.getFromLocalStorage('restaurants');

        if(storedData === null){
            this.data.set(dataJson as Restaurant[]);
            this.storageService.saveToLocalStorage('restaurants', this.data())
        } else {
            this.data.set(storedData);
        }
    }
}
