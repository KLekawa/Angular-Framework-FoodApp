import { Component, inject, signal } from '@angular/core';
import { form, required, FormField, validate } from '@angular/forms/signals';
import { UserService } from '../../../services/user-service';
import { Address, CustomerAccount, UserRole } from '../../../models/user.model';

@Component({
  imports: [FormField],
  selector: 'app-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class Register {

  userService = inject(UserService);

  registerForm = signal({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    phone: '',
    street: '',
    buildingNumber: '',
    apartmentNumber: '',
    postalCode: '',
    city: ''
  })

  form = form(this.registerForm, (schema) =>{
    required(schema.name);
    required(schema.email);
    required(schema.password);
    required(schema.repeatPassword);
    required(schema.street);
    required(schema.buildingNumber);
    required(schema.postalCode);
    required(schema.city);

    validate(schema.email, ({ value }) => {
      const email = value().trim().toLowerCase();

      const exists = this.userService.GetAll().some(
        user => user.email.toLowerCase() === email 
      );

      return exists 
        ?  { kind: 'notUnique', message: 'Email already taken' }
        : null;
    })

    validate(schema.password, ({ value, valueOf }) => {
      return value() === valueOf(schema.repeatPassword)
        ? null
        : { kind: 'notSamePasswords', message: 'Passwords are not the same' }
    })
  });

  
  Register(){
    if(this.form().invalid()){
      console.log('Formularz niepoprawny: ', this.form().errorSummary());
      return;
    }

    const address: Address = {
      street: this.registerForm().street,
      buildingNumber: this.registerForm().buildingNumber,
      apartmentNumber: this.registerForm().apartmentNumber || undefined,
      postalCode: this.registerForm().postalCode,
      city: this.registerForm().city,
    }

    const id = this.userService.GetAll().reduce(
      (max, user) => Math.max(max, user.id ?? 0),
      0
    );

    const customerAccount: CustomerAccount = {
      id: id+1,
      name: this.registerForm().name,
      email: this.registerForm().email,
      password: this.registerForm().password,
      phone: this.registerForm().phone || undefined,
      role: UserRole.customer,
      deliveryAddress: address
    }

    this.userService.Register(customerAccount);

  }
}
