import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderStatus } from '../../../models/order.model';
import { OrderService } from '../../../services/order-service';
import { form, FormField } from '@angular/forms/signals';

@Component({
  imports: [RouterLink, DatePipe, DecimalPipe, FormField],
  selector: 'app-order-list-admin',
  styleUrl: './order-list-admin.scss',
  templateUrl: './order-list-admin.html',
})
export class OrderHistory {
  OrderStatus = OrderStatus;
  orderService = inject(OrderService);

  orders =  this.orderService.orders;

  filterForm = signal({
    orderStatus: 'All'
  })
  
  form = form(this.filterForm);


  // parsedStatus = OrderStatus[this.filterForm().orderStatus as keyof typeof OrderStatus];
  userOrders = computed( () =>{
    const status = this.filterForm().orderStatus;
    const orders = this.orders();

    if(status === 'All')
      return orders;

    return orders.filter(o => o.status === Number(status));
  })


  ResetStatus(){
    this.filterForm.update(c => ({
      ...c,
      orderStatus: 'All'
    }));

  }
}
