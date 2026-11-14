import { inject, Service, signal } from '@angular/core';
import { Order, OrderStatus } from './../models/order.model';
import { UserService } from './user-service';
import { LocalStorageService } from './local-storage-service';
import { CartService } from './cart-service';

@Service()
export class OrderService {
    private data = signal<Order[]>([]);
    private userService = inject(UserService);
    private localStorageService = inject(LocalStorageService);
    private cartService = inject(CartService);

    constructor(){
        this.InitializeOrders();
    }

    CreateOrder(data: Omit<Order, 'orderId' | 'userId' | 'createdAt' | 'status'>){
        const order: Order = {
            ...data,
            orderId: this.data().reduce((maxId, order) => Math.max(maxId, order.orderId), 0) + 1,
            userId: this.userService.isLoggedIn()?.id ?? null,
            createdAt: new Date().toISOString(),
            status: OrderStatus.New
        };

        this.data.update(o => [...o , order]);
        this.localStorageService.saveToLocalStorage('orders', this.data());
        this.cartService.ClearCart();
        return order;
    }

    GetOrdersByUserId(userId:number){
        return this.data().filter(o => o.userId === userId);
    }

    GetOrdersById(orderId:number){
        return this.data().find(o => o.orderId === orderId);
    }

    GetAll(){
        return this.data();
    }

    ChangeStatus(orderId: number, status: OrderStatus){
        this.data.update(orders =>
            orders.map(order =>
                order.orderId === orderId 
                ? {...order, status: status} 
                : order
            )
        );

        this.localStorageService.saveToLocalStorage('orders', this.data())
    }


    private InitializeOrders(){
        const data = this.localStorageService.getFromLocalStorage('orders');

        this.data.set(Array.isArray(data) ? data : []);
     }

}
