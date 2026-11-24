import { computed, inject, Service, signal } from '@angular/core';
import { Order, OrderStatus } from './../models/order.model';
import { UserService } from './user-service';
import { HttpClient, HttpErrorResponse, httpResource } from '@angular/common/http';

@Service()
export class OrderService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = 'http://localhost:3000/orders';
    private userService = inject(UserService);


    private readonly ordersResource = httpResource<Order[]>(
        () => this.apiUrl,
        {defaultValue: []}
    );

    readonly orders = this.ordersResource.value;
    readonly ordersLoading = this.ordersResource.isLoading;
    readonly ordersError = computed( () => 
       this.ordersResource.error() === undefined
        ? null
        : "Couldn't get orders, check API connections"
    ) 
    // GetAll(){

    // }
    
    private readonly selectedId = signal<number | undefined>(undefined);
    private readonly detailResourceByOrderId = httpResource<Order>(
        () => {
            const id = this.selectedId();
            return id === undefined
                ? undefined
                : `${this.apiUrl}/${id}`

        },
    );

    readonly selectedOrder = computed( () => {
        const status = this.detailResourceByOrderId.status();
        return (status === 'resolved' || status === 'local') && this.detailResourceByOrderId.hasValue()
            ? this.detailResourceByOrderId.value()
            : null;
    });
    readonly orderLoading = this.detailResourceByOrderId.isLoading;
    readonly orderError = computed( () =>{
        const error = this.detailResourceByOrderId.error();
        if(error === undefined){
            return null;
        }
        return error instanceof HttpErrorResponse && error.status === 404
            ? "Order not found"
            : "Couldn't get order, check API connections"
    }) 
    GetOrdersById(id:number){
        this.selectedId.set(id);
    }


    private readonly userSelectedId = signal<number | undefined>(undefined);
    private readonly detailResourceByUserId = httpResource<Order[]>(
        () => {
            const id = this.userSelectedId();
            return id === undefined
                ? undefined
                : `${this.apiUrl}?userId=${id}`

        },
        {defaultValue: []}
    );
    readonly selectedOrderByUserId = this.detailResourceByUserId.value;
    readonly selectedOrderByUserIdLoading = this.detailResourceByUserId.isLoading;
    readonly selectedOrderByUserIdError = this.detailResourceByUserId.error;
    GetOrdersByUserId(userId:number){
        this.userSelectedId.set(userId);
    }



    CreateOrder(data: Omit<Order, 'id' | 'userId' | 'createdAt' | 'status'>){
        const order = {
            ...data,
            userId: this.userService.isLoggedIn()?.id ?? null,
            createdAt: new Date().toISOString(),
            status: OrderStatus.New
        };

        return this.http.post<Order>(this.apiUrl, order);
    }


    ChangeStatus(id: number, status: OrderStatus){
        return this.http.patch<Order>(
            `${this.apiUrl}/${id}`,
            {status: status}
        )
    }

    ReloadAll(){
        this.ordersResource.reload();
    }

    ReloadOrderDetails(){
        this.detailResourceByOrderId.reload();
    }
    ReloadUserDetails(){
        this.detailResourceByUserId.reload();
    }

    // private data = signal<Order[]>([]);
    // private userService = inject(UserService);
    // private localStorageService = inject(LocalStorageService);
    // private cartService = inject(CartService);

    // constructor(){
    //     this.InitializeOrders();
    // }

    // CreateOrder(data: Omit<Order, 'orderId' | 'userId' | 'createdAt' | 'status'>){
    //     const order: Order = {
    //         ...data,
    //         orderId: this.data().reduce((maxId, order) => Math.max(maxId, order.orderId), 0) + 1,
    //         userId: this.userService.isLoggedIn()?.id ?? null,
    //         createdAt: new Date().toISOString(),
    //         status: OrderStatus.New
    //     };

    //     this.data.update(o => [...o , order]);
    //     this.localStorageService.saveToLocalStorage('orders', this.data());
    //     this.cartService.ClearCart();
    //     return order;
    // }

    // GetOrdersByUserId(userId:number){
    //     return this.data().filter(o => o.userId === userId);
    // }

    // GetOrdersById(orderId:number){
    //     return this.data().find(o => o.orderId === orderId);
    // }

    // GetAll(){
    //     return this.data();
    // }

    // ChangeStatus(orderId: number, status: OrderStatus){
    //     this.data.update(orders =>
    //         orders.map(order =>
    //             order.orderId === orderId 
    //             ? {...order, status: status} 
    //             : order
    //         )
    //     );

    //     this.localStorageService.saveToLocalStorage('orders', this.data())
    // }


    // private InitializeOrders(){
    //     const data = this.localStorageService.getFromLocalStorage('orders');

    //     this.data.set(Array.isArray(data) ? data : []);
    //  }

}
