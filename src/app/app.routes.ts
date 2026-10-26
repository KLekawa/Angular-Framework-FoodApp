import { Routes } from '@angular/router';
import { RestaurantList } from './components/restaurant-list/restaurant-list';
import { RestaurantDetails } from './components/restaurant-details/restaurant-details';
import { RestaurantMenu } from './components/restaurant-menu/restaurant-menu';
import { ProductDetails } from './components/product-details/product-details';
import { RestaurantListAdmin } from './components/admin/restaurant-list-admin/restaurant-list-admin';
import { RestaurantDetailsAdmin } from './components/admin/restaurant-details-admin/restaurant-details-admin';
import { RestaurantForm } from './components/admin/restaurant-form/restaurant-form';

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
        path: 'admin/restaurants',
        component: RestaurantListAdmin
    },
    {
        path: 'admin/restaurant/:id',
        component: RestaurantDetailsAdmin
    },
    {
        path: 'admin/restaurants/add',
        component: RestaurantForm,
        data: {mode: 'add'}
    },
    {
        path: 'admin/restaurants/edit/:id',
        component: RestaurantForm,
        data: {mode: 'edit'}
    },
];
