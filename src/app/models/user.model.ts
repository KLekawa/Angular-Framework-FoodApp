export type UserAccountBase = {
    id: number;
    name: string;
    email: string;
    password: string;
    phone?: string;
}

export enum UserRole {
    'customer',
    'admin'
} 

export type Address = {
  street: string;
  buildingNumber: string;
  apartmentNumber?: string;
  postalCode: string;
  city: string;
}

export type CustomerAccount = UserAccountBase & {
    role: UserRole.customer;
    deliveryAddress: Address;
}

export type AdminAccount = UserAccountBase & {
    role: UserRole.admin;
}

export type UserAccount = CustomerAccount | AdminAccount;

export type UserSeesion = {
    userId: number;
    expiresAt: number;
}