export interface MenuProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  available: boolean;
}

export interface MenuCategory {
  id: number;
  name: string;
  products: MenuProduct[];
}

export interface RestaurantMenu {
  restaurantId: number;
  categories: MenuCategory[];
}

