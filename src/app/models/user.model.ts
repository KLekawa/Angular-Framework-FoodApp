type UserAccountBase = {
    id: number;
    name: string;
    email: string;
    password: string;
    phone?: string;
}

enum UserRole {
    'customer',
    'admin'
} 

type Address = {
  street: string;
  buildingNumber: string;
  apartmentNumber?: string;
  postalCode: string;
  city: string;
}

type CustomerAccount = UserAccountBase & {
    role: UserRole.customer;
    deliveryAddress: Address;
}

type AdminAccount = UserAccountBase & {
    role: UserRole.admin;
}

type UserAccount = CustomerAccount | AdminAccount;