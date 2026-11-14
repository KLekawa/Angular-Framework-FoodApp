import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
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
  private orderService = inject(OrderService);

  orders =  this.orderService.GetAll();
  userOrders = this.orders;

  filterForm = signal({
    orderStatus: 'All'
  })
  
  form = form(this.filterForm);

  FilterStatusChange(){
    if(this.filterForm().orderStatus === 'All'){
      this.userOrders = this.orders;
      return;
    }

    const parsedStatus = OrderStatus[this.filterForm().orderStatus as keyof typeof OrderStatus];
    this.userOrders = this.orders.filter(o => o.status === parsedStatus);
  }

  ResetStatus(){
    this.filterForm.update(c => ({
      ...c,
      orderStatus: 'All'
    }));

    this.FilterStatusChange();
  }
}
