export const AdminRoutes = [
    {
        path: 'restaurants',
        loadComponent: () => import("./restaurant-list-admin/restaurant-list-admin").then((m) => m.RestaurantListAdmin) 
    },
    {
        path: 'restaurant/:id',
        loadComponent: () => import("./restaurant-details-admin/restaurant-details-admin").then((m) => m.RestaurantDetailsAdmin) 

    },
    {
        path: 'restaurants/add',
        loadComponent: () => import("./restaurant-form/restaurant-form").then((m) => m.RestaurantForm),
        data: {mode: 'add'}
    },
    {
        path: 'restaurants/edit/:id',
        loadComponent: () => import("./restaurant-form/restaurant-form").then((m) => m.RestaurantForm), 
        data: {mode: 'edit'}
    },
    {
        path: 'restaurants/deleteConfirmation/:id',
        loadComponent: () => import("./restaurant-form-confirmation/restaurant-form-confirmation").then((m) => m.RestaurantFormConfirmation) 
    },
    {
        path: 'users',
        loadComponent: () => import('./users/users').then((m) => m.Users),
        // children: [
        //     {
        //         path: 'new',
        //         //component user form
        //     }
        // ]
    }
]