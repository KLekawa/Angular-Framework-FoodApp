import { computed, inject, Service, signal } from '@angular/core';
import { Restaurant } from '../models/restaurant.model';
import dataJson from '../../data/restaurants.json';
import { HttpClient, httpResource } from '@angular/common/http';


@Service()
export class RestaurantsService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = 'http://localhost:3000/restaurants';
    private readonly listResource = httpResource<Restaurant[]>(() => this.apiUrl);
    private readonly selectedId = signal<number | undefined>(undefined);

    private readonly detailResource = httpResource<Restaurant>(
        () =>  {
            const id = this.selectedId();
            return id === undefined ? undefined : `${this.apiUrl}/${id}`;
        }
    );

    GetAll(){
        return this.listResource;
    }

    GetById(id: number){
        this.selectedId.set(id);
        return this.detailResource;
    }

    readonly restaurants = this.listResource.value;
    readonly isLoading = this.listResource.isLoading;
    readonly error = computed(() => 
        this.listResource.error() === undefined
        ? null
        : "Could get restaurants, check API connections"
    )
    
    Add(restaurant: Restaurant){
        return this.http
        .post<Restaurant>(this.apiUrl, restaurant);
    }
    // private data = signal<Restaurant[]>([]);
    // storageService = inject(LocalStorageService);

    // constructor() {
    //     this.initializeRestaurants();
    // }


    // GetAll(){
    //     return this.data;
    // }

    // GetById(id: number){
    //     return this.data().find(r => r.id === id);
    // }

    // Add(restaurant: Restaurant){
    //     this.data.update(restaurants => [...restaurants, restaurant]);
    //     this.storageService.saveToLocalStorage('restaurants', this.data());
    // }
    
    // EditRestaurant(restaurant: Restaurant){
    //     this.data.update(restaurants =>
    //         restaurants.map(r =>
    //             r.id === restaurant.id ? restaurant : r
    //         )
    //     );

    //     this.storageService.saveToLocalStorage('restaurants', this.data());
    // }

    // ChangeStatus(id: number){
    //     this.data.update(restaurants =>
    //         restaurants.map(r =>
    //             r.id === id ? {...r, isActive: !r.isActive} : r
    //         )
    //     );

    //     this.storageService.saveToLocalStorage('restaurants', this.data());
    // }

    // private initializeRestaurants(){
    //     const storedData = this.storageService.getFromLocalStorage('restaurants');

    //     if(storedData === null){
    //         this.data.set(dataJson as Restaurant[]);
    //         this.storageService.saveToLocalStorage('restaurants', this.data())
    //     } else {
    //         this.data.set(storedData);
    //     }
    // }
}
