import { inject, Service, signal } from '@angular/core';
import dataJson from '../../data/menu-restauracje.json'
import { RestaurantMenu } from '../models/menu.model'
import { LocalStorageService } from './local-storage-service';


@Service()
export class MenuService {
    storageService = inject(LocalStorageService);
    private data = signal<RestaurantMenu[]>([]);

    constructor(){
        this._InitializeMenus();
    }

    GetCategoriesById(restaurantId: number){
        return this.data()
        .find(c => c.restaurantId === restaurantId)
        ?.categories;
    }

    GetProductDetails(restaurantID:number, productId:number){
        return this.data()
        .find(menu => menu.restaurantId === restaurantID)
        ?.categories
        .flatMap(category => category.products)
        .find(product => product.id === productId);
    }

    private _InitializeMenus(){
        const storedData = this.storageService.getFromLocalStorage('menus');    

        if(storedData === null){
            this.data.set(dataJson as RestaurantMenu[]);
            this.storageService.saveToLocalStorage('menus', this.data())
        } else {
            this.data.set(storedData);
        }
    }
}
