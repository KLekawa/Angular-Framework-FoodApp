import { Service, signal } from '@angular/core';
import dataJson from '../../data/restaurants.json'
import { Restaurant } from '../models/restaurant.model';


@Service()
export class Restaurants {
    private data = signal<Restaurant[]>([]);

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
        this.saveToLocalStorage('restaurants', this.data());
    }
    
    editRestaurant(restaurant: Restaurant){
        this.data.update(restaurants =>
            restaurants.map(r =>
                r.id === restaurant.id ? restaurant : r
            )
        );

        this.saveToLocalStorage('restaurants', this.data());
    }

    changeStatus(id: number){
        this.data.update(restaurants =>
            restaurants.map(r =>
                r.id === id ? {...r, isActive: !r.isActive} : r
            )
        );

        this.saveToLocalStorage('restaurants', this.data());
    }


    private saveToLocalStorage(key: string, data: any){
        const jsonData = JSON.stringify(data);
        localStorage.setItem(key, jsonData);
    }

    private getFromLocalStorage(key: string){
        const storedData = localStorage.getItem(key);
        return storedData ? JSON.parse(storedData) : null;
    }

    private initializeRestaurants(){
        const storedData = this.getFromLocalStorage('restaurants');

        if(storedData === null){
            this.data.set(dataJson as Restaurant[]);
            this.saveToLocalStorage('restaurants', this.data())
        } else {
            this.data.set(storedData);
        }
    }
}
