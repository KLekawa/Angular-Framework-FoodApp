import { Component, computed, inject, input } from '@angular/core';
import { OrderService } from '../../../services/order-service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderStatus } from '../../../models/order.model';

@Component({
  imports: [DatePipe, DecimalPipe, RouterLink],
  selector: 'app-order-details',
  styleUrl: './order-details.scss',
  templateUrl: './order-details.html',
})
export class OrderDetails {
  orderService = inject(OrderService);
  OrderStatus = OrderStatus;
  id = input()

  order = this.orderService.selectedOrder;

  ngOnInit(){
    const id = this.id();
    if(id === undefined)
      return

    this.orderService.GetOrdersById(Number(id));
  }
}
