import { computed, inject, Service, signal } from '@angular/core';
import { Restaurant } from '../models/restaurant.model';
import { HttpClient, HttpErrorResponse, httpResource } from '@angular/common/http';
import { isActive } from '@angular/router';


@Service()
export class RestaurantsService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = 'http://localhost:3000/restaurants';


    private readonly listResource = httpResource<Restaurant[]>(
        () => this.apiUrl,
        {defaultValue: []}
    );

    readonly restaurants = this.listResource.value;
    readonly isLoading = this.listResource.isLoading;
    readonly error = computed(() => 
        this.listResource.error() === undefined
        ? null
        : "Couldn't get restaurants, check API connections"
    ) 
    //  GetAll(){
    //     return this.listResource.value();
    // }  


    private readonly selectedId = signal<number | undefined>(undefined);

    private readonly detailResource = httpResource<Restaurant>(
        () =>  {
            const id = this.selectedId();
            return id === undefined 
                ? undefined 
                : `${this.apiUrl}/${id}`;
        }
    );

    readonly selectedRestaurant = computed( () => {
        const status = this.detailResource.status();
        return (status === 'resolved' || status === 'local') && this.detailResource.hasValue()
            ? this.detailResource.value()
            : null;
    });
    readonly detailsLoading = this.detailResource.isLoading;
    readonly detailsError = computed( () => {
        const error = this.detailResource.error();
        if(error === undefined){
            return null;
        }

        return error instanceof HttpErrorResponse && error.status === 404
            ? "Restaurant not found"
            : "Couldn't get restaurant, check API connections"
    })
    GetById(id: number){
        this.selectedId.set(id);
    }



    EditRestaurant(restaurant: Restaurant){
        return this.http.put<Restaurant>(
            `${this.apiUrl}/${restaurant.id}`,
            restaurant
        );
    }

    ChangeStatus(id: number){
        const restaurant = this.selectedRestaurant();

        if(!restaurant || restaurant.id !== id) return;

        return this.http.patch<Restaurant>(
            `${this.apiUrl}/${id}`,
            {isActive: !restaurant.isActive }
        );
    }

    UpdateSelectedRestaurant(restaurant: Restaurant) {
        this.detailResource.set(restaurant);
    }


    Add(restaurant: Restaurant){
        return this.http
        .post<Restaurant>(this.apiUrl, restaurant);
    }

    Reload(){
        this.listResource.reload();
    }

    ReloadDetails(){
        this.detailResource.reload()
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
