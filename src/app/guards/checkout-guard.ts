import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CartService } from '../services/cart-service';

export const checkoutGuard: CanActivateFn = (route, state) => {
  const cartService = inject(CartService);
  const router = inject(Router);
  
  const cart = cartService.GetCart();
  if(cart && cart.items.length > 0)
    return true;

  return router.createUrlTree(['/cart']);
};
