import { Service, signal } from '@angular/core';
import menu from '../../data/menu.json'
import { RestaurantMenu } from './../models/menu.model'


@Service()
export class Menu {
    private menu = signal(menu as RestaurantMenu)
    
    getCategories(){
        return this.menu().categories;
    }

    getProductDetails(id:number){
        return this.menu()
        .categories
        .flatMap(c => c.products)
        .find(p => p.id === id)
    }
}
