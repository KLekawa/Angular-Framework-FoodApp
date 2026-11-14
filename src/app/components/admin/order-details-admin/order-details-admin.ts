import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderStatus } from '../../../models/order.model';
import { OrderService } from '../../../services/order-service';
import { form, FormField } from '@angular/forms/signals';

@Component({
  imports: [DatePipe, DecimalPipe, RouterLink, FormField],
  selector: 'app-order-details-admin',
  styleUrl: './order-details-admin.scss',
  templateUrl: './order-details-admin.html',
})
export class OrderDetailsAdmin {
  private orderService = inject(OrderService);
  OrderStatus = OrderStatus;
  orderId = input()

  statusForm = signal({
    newStatus: ''
  })

  form = form(this.statusForm);

  order = computed( () => {
    const id = this.orderId();
    if(id === undefined)
      return null;

    return this.orderService.GetOrdersById(Number(id));
  })

  ChangeStatus(){
    this.orderService.ChangeStatus(Number(this.orderId()), Number(this.statusForm().newStatus) as OrderStatus);
  }

}
