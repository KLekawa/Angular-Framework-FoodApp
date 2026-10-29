import { Service, signal } from '@angular/core';
import { Restaurant } from './models/restaurant.model';
import dataJson from '../data/restaurants.json'


@Service()
export class LocalStorageService {
    
    saveToLocalStorage(key: string, data: any){
        const jsonData = JSON.stringify(data);
        localStorage.setItem(key, jsonData);
    }

    getFromLocalStorage(key: string){
        const storedData = localStorage.getItem(key);
        return storedData ? JSON.parse(storedData) : null;
    }


        
}
