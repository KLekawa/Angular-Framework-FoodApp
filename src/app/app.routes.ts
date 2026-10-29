import { Routes } from '@angular/router';
import { RestaurantList } from './components/restaurant-list/restaurant-list';
import { RestaurantDetails } from './components/restaurant-details/restaurant-details';
import { RestaurantMenu } from './components/restaurant-menu/restaurant-menu';
import { ProductDetails } from './components/product-details/product-details';


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
        path: 'restaurant/:id/menu/productdetails/:id',
        component: ProductDetails
    },
    {
        path: 'login',
        loadComponent: () => import('./components/login/login').then((m)=> m.Login)
    },
    {
        path: 'register',
        loadComponent: () => import('./components/register/register').then((m)=> m.Register)
    },
    {
        path: 'profile',
        loadComponent: () => import('./components/profile/profile').then((m)=> m.Profile)
    },
    {
        path: 'admin',
        loadChildren: () => import('./components/admin/admin.routes').then((m) => m.AdminRoutes),
    }
    
];
