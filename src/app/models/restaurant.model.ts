export type Restaurant = {
    id: number | null
    name: string,
    description: string,
    cuisine: 'polish' | 'italian' | 'american' | 'thai' | 'chinese' | ""
    imageUrl: string,
    rating: number | null,
    deliveryTimeMin: number | null,
    deliveryTimeMax: number | null,
    deliveryFee: number | null,
    minimumOrderValue: number | null,
    isActive: boolean | null
};