import { inject, Service, signal } from '@angular/core';
import { LocalStorageService } from './local-storage-service';
import { Cart } from '../models/cart.model'
import { MenuService } from './menu-service';

@Service()
export class CartService {
    private storageService = inject(LocalStorageService);
    private data = signal<Cart | null>(null);
    private menuService = inject(MenuService);

    constructor(){
        this.InitializeCart();
    }

    GetCart(){
        return this.data();
    }

    AddToCart(restaurantId:number, productId: number){
        this.data.update( cart =>{
            if(cart === null){
                return {
                    restaurantId: restaurantId,
                    items: [{productId: productId, quantity: 1}]
                };
            }

            if(cart.items.some(i => i.productId === productId)){
                return {
                    ...cart,
                    items: cart.items.map(i =>(
                        i.productId === productId
                        ? { ...i, quantity: i.quantity + 1}
                        : i
                    ))
                };
            }

            return {
                ...cart,
                items: [
                    ...cart.items,
                    {productId: productId, quantity: 1}
                ]
            }
        })
        this.storageService.saveToLocalStorage('cart', this.data());
       
    }

    RemoveFromCart(productId: number){
        this.data.update( cart => {
            if(cart === null)
                return null;

            return {
                ...cart,
                items: cart.items.filter(item => item.productId !== productId)
            };
        });

        if(this.data()?.items.length === 0){
            this.data.set(null);
            this.storageService.removeFromLocalStorage('cart');
            return;
        }
        this.storageService.saveToLocalStorage('cart', this.data());
    }

    ChangeQuantity(productId: number, quantity: number){
        if(quantity <= 0){
            this.RemoveFromCart(productId);
            return;
        }

        this.data.update( cart => {
            if(cart === null){
                return null;
            }

            return{
                ...cart,
                items: cart.items.map(item =>
                    item.productId === productId
                    ? {...item, quantity: quantity} 
                    : item
                )
            }
        })

        this.storageService.saveToLocalStorage('cart', this.data());
    }

    GetTotalPrice(){
        const cart = this.data();

        if(!cart)
            return 0;

        return cart.items.reduce((total, item) => {
            const product = this.menuService.GetProductDetails(cart.restaurantId, item.productId);
            return total + (product?.price ?? 0) * item.quantity;
        }, 0);
    }

    private InitializeCart(){
        let storageData = this.storageService.getFromLocalStorage('cart');

        if(storageData !== null){
            this.data.set(storageData);
        }
    }
}
