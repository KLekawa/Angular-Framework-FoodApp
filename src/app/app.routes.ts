import { Routes } from '@angular/router';
import { RestaurantList } from './components/restaurant-list/restaurant-list';
import { RestaurantDetails } from './components/restaurant-details/restaurant-details';
import { RestaurantMenu } from './components/restaurant-menu/restaurant-menu';
import { ProductDetails } from './components/product-details/product-details';
import { adminGuard } from './guards/admin-guard';
import { profileEditGuard } from './guards/profile-edit-guard';


export const routes: Routes = [
    {
        path: 'restaurants',
        component: RestaurantList
    },
    {
        path: 'restaurant/:id',
        component: RestaurantDetails
    },
    {
        path: 'restaurant/:id/menu',
        component: RestaurantMenu
    },
    {
        path: 'restaurant/:restaurantId/menu/productdetails/:productId',
        component: ProductDetails
    },
    {
        path: 'login',
        loadComponent: () => import('./components/auth/login/login').then((m)=> m.Login)
    },
    {
        path: 'register',
        loadComponent: () => import('./components/auth/register/register').then((m)=> m.Register)
    },
    {
        path: 'profile/:id',
        loadComponent: () => import('./components/profile/profile').then((m)=> m.Profile)
    },
    {
        path: 'profile/:id/edit',
        canActivate: [profileEditGuard],
        loadComponent: () => import('./components/profile/profile-edit/profile-edit').then((m)=> m.ProfileEdit)
    },
    {
        path: 'admin',
        canActivate: [adminGuard],
        loadComponent: () => import('./components/admin/admin').then((m) => m.Admin),
        loadChildren: () => import('./components/admin/admin.routes').then((m) => m.AdminRoutes),
    },
    {
        path: 'cart',
        loadComponent: () => import('./components/orders/cart/cart').then((m) => m.Cart)
    }
    
];
