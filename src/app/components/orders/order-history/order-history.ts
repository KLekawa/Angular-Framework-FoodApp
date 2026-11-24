import { Component, computed, inject, input } from '@angular/core';
import { OrderService } from '../../../services/order-service';
import { RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { OrderStatus } from '../../../models/order.model';

@Component({
  imports: [RouterLink, DatePipe, DecimalPipe],
  selector: 'app-order-history',
  styleUrl: './order-history.scss',
  templateUrl: './order-history.html',
})
export class OrderHistory {
  userId = input();
  OrderStatus = OrderStatus;
  orderService = inject(OrderService);

  userOrders = this.orderService.selectedOrderByUserId;

  ngOnInit(){
    const id = this.userId();
    if(id === undefined)
      return

    this.orderService.GetOrdersByUserId(Number(id));
  }
}
