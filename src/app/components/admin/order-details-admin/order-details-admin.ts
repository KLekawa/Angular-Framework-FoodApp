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
  orderService = inject(OrderService);
  OrderStatus = OrderStatus;
  id = input()

  statusForm = signal({
    newStatus: ''
  })

  form = form(this.statusForm);

  order = this.orderService.selectedOrder;

  ChangeStatus(){
    const id = this.id();
    if(id === undefined) return;

    this.orderService.ChangeStatus(Number(id), Number(this.statusForm().newStatus) as OrderStatus)
      .subscribe({
        next: () => {
          this.orderService.ReloadAll();
          this.orderService.ReloadOrderDetails();
        },
        error: err => console.error('Failed to change status: ', err)
      });
  }

  ngOnInit(){
    const id = this.id();
    if(id === undefined)
      return

    this.orderService.GetOrdersById(Number(id));
  }
}
