import { Address } from './user.model';

export interface OrderUserData{
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address: Address;
    paymentMethod: string;
}

export enum OrderStatus{
    New,
    Accepted,
    InPreparation,
    Ready,
    InDelivery,
    Delivered,
    Cancelled
}

export interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Order{
    orderId: number;
    userId: number | null;
    restaurantId: number;
    orderUserData: OrderUserData;
    orderItems: OrderItem[];
    status: OrderStatus;
    createdAt: string;
    subtotal: number;
    deliveryFee: number;
    totalPrice: number;
}