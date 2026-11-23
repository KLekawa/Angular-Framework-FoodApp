import { Component, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { UserService } from '../../../services/user-service';
import { Address, UserRole } from '../../../models/user.model';
import { OrderService } from '../../../services/order-service';
import { Order, OrderItem, OrderUserData } from '../../../models/order.model';
import { CartService } from '../../../services/cart-service';
import { RestaurantsService } from '../../../services/restaurants-service';
import { MenuService } from '../../../services/menu-service';
import { Router } from '@angular/router';

@Component({
  imports: [FormField],
  selector: 'app-checkout',
  styleUrl: './checkout.scss',
  templateUrl: './checkout.html',
})
export class Checkout {
  private userService = inject(UserService);
  submitted = signal(false);
  private orderService = inject(OrderService);
  private cartService = inject(CartService);
  private restaurantService = inject(RestaurantsService);
  private menuService = inject(MenuService);
  private router = inject(Router);

  menuLoading = this.menuService.loading;
  menuError = this.menuService.error;

  restaurantLoading = this.restaurantService.detailsLoading;
  restaurantError = this.restaurantService.detailsError;

  checkoutForm = signal({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    street: '',
    buildingNumber: '',
    apartmentNumber: '',
    postalCode: '',
    city: '',
    paymentMethod: ''
  })

  constructor(){
    const user = this.userService.isLoggedIn();

    if(!user) 
      return;

    this.checkoutForm.update(current => ({
      ...current,
      email: user.email,
      phone: user.phone || '',
      ...(user.role === UserRole.customer? {
        street: user.deliveryAddress.street,
        buildingNumber: user.deliveryAddress.buildingNumber,
        apartmentNumber: user.deliveryAddress.apartmentNumber ?? '',
        postalCode: user.deliveryAddress.postalCode,
        city: user.deliveryAddress.city
      }: {})
    }));
  }

  form = form(this.checkoutForm, (schema) =>{
    required(schema.firstname, {
      message: 'First name is required'
    });
    required(schema.lastname, {
       message: 'Last name is required'
    });
    required(schema.email, {
       message: 'Email is required'
    });
    required(schema.phone, {
       message: 'Phone is required'
    });
    required(schema.street, {
       message: 'Street is required'
    });
    required(schema.buildingNumber, {
       message: 'Building Number is required'
    });
    required(schema.postalCode, {
       message: 'Postal Code is required'
    });
    required(schema.city, {
       message: 'City is required'
    });
    required(schema.paymentMethod, {
       message: 'Payment Method is required'
    });

  });

  Checkout(){
      this.submitted.set(true);
    if(this.form().invalid()){
      console.log('Formularz niepoprawny: ', this.form().errorSummary());
      return;
    }

    const cart = this.cartService.GetCart();
    if(cart === null || cart.restaurantId === null)
      return;

    const address: Address = {
      street: this.checkoutForm().street,
      buildingNumber: this.checkoutForm().buildingNumber,
      apartmentNumber: this.checkoutForm().apartmentNumber ?? '',
      postalCode: this.checkoutForm().postalCode,
      city: this.checkoutForm().city,
    }


    const orderUserData: OrderUserData = {
      firstname: this.checkoutForm().firstname,
      lastname: this.checkoutForm().lastname,
      email: this.checkoutForm().email,
      phone: this.checkoutForm().phone,
      address: address,
      paymentMethod: this.checkoutForm().paymentMethod,
    }
    const subtotal = this.cartService.GetTotalPrice();
    const deliveryFee = this.restaurantService.selectedRestaurant()?.deliveryFee;
    
    if(deliveryFee == null)
      return


    const orderItems: OrderItem[] = cart.items.map(item => {
      const product = this.menuService.FindProduct(item.productId);

      return {
        productId: item.productId,
        name: product?.name ?? '',
        price: product?.price ?? 0,
        quantity: item.quantity
      };
    });

    if (orderItems.some(item => item.name === '')) {
      console.error('Nie udało się pobrać wszystkich produktów');
      return;
    }

    const order: Omit<Order, 'orderId' | 'userId' | 'createdAt' | 'status'> = {
      restaurantId: cart.restaurantId,
      orderUserData: orderUserData,
      orderItems: orderItems,
      subtotal: subtotal,
      deliveryFee: Number(deliveryFee),
      totalPrice: subtotal + Number(deliveryFee),
    }
  
    const orderResponse = this.orderService.CreateOrder(order);
    this.router.navigate(['/order-details/', orderResponse.orderId]);

  }

  ngOnInit(){
    const cart = this.cartService.GetCart();

    if(cart === null || cart?.restaurantId === null)
      return;

    this.restaurantService.GetById(cart.restaurantId)
    this.menuService.GetCategoriesById(cart.restaurantId);
  }
}

