import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user-service';

export const profileEditGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const loggedUser = userService.isLoggedIn();
  const profileId = Number(route.paramMap.get('id'));

  if (!loggedUser) {
    return router.createUrlTree(['/login']);
  }

  if (userService.ifAdmin() || loggedUser.id === profileId) {
    return true;
  }

  return router.createUrlTree(['/profile', loggedUser.id]);
};
