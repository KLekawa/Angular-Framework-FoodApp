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
  private orderService = inject(OrderService);
  OrderStatus = OrderStatus;
  orderId = input()

  order = computed( () => {
    const id = this.orderId();
    if(id === undefined)
      return null;

    return this.orderService.GetOrdersById(Number(id));
  })

}
