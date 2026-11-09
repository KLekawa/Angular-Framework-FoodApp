export interface CartItem {
    productId: number;
    quantity: number;
}

export interface Cart {
    restaurantId: number;
    items: CartItem[];
}