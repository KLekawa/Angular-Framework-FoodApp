import { computed, Service, signal } from '@angular/core';
import { RestaurantMenu } from '../models/menu.model'
import { httpResource } from '@angular/common/http';


@Service()
export class MenuService {
    private readonly apiUrl = 'http://localhost:3000/menu';

    private readonly restaurantId = signal<number | undefined>(undefined);
    private readonly categoriesResource = httpResource<RestaurantMenu[]>(
        () => {
            const id = this.restaurantId();
            return id === undefined ? undefined : `${this.apiUrl}?restaurantId=${id}`;
        }
    );

    readonly categoriesOfRestaurant = computed(() =>
        this.categoriesResource.value()?.[0]?.categories ?? []
    );
    readonly loading = this.categoriesResource.isLoading;
    readonly error = this.categoriesResource.error;
    GetCategoriesById(restaurantId: number){
        this.productId.set(undefined);
        this.restaurantId.set(restaurantId);
    }



    private readonly productId = signal<number | undefined>(undefined);
    readonly selectedProduct = computed( () => {
        const id = this.productId();

        if(id === undefined) 
            return undefined;

        return this.categoriesOfRestaurant()
            .flatMap(category => category.products)
            .find(product => product.id === id);
    });

    GetProductDetails(restaurantId: number, productId: number){
        this.restaurantId.set(restaurantId);
        this.productId.set(productId);
    }

    FindProduct(productId: number){
        return this.categoriesOfRestaurant()
            .flatMap(category => category.products)
            .find(product => product.id === productId);
    }


    // storageService = inject(LocalStorageService);
    // private data = signal<RestaurantMenu[]>([]);

    // constructor(){
    //     this._InitializeMenus();
    // }

    // GetCategoriesById(restaurantId: number){
    //     return this.data()
    //     .find(c => c.restaurantId === restaurantId)
    //     ?.categories;
    // }

    // GetProductDetails(restaurantID:number, productId:number){
    //     return this.data()
    //     .find(menu => menu.restaurantId === restaurantID)
    //     ?.categories
    //     .flatMap(category => category.products)
    //     .find(product => product.id === productId);
    // }

    // private _InitializeMenus(){
    //     const storedData = this.storageService.getFromLocalStorage('menus');    

    //     if(storedData === null){
    //         this.data.set(dataJson as RestaurantMenu[]);
    //         this.storageService.saveToLocalStorage('menus', this.data())
    //     } else {
    //         this.data.set(storedData);
    //     }
    // }
}
