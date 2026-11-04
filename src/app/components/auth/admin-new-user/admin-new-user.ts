import { Component, inject, signal } from '@angular/core';
import { form, FormField, required, validate } from '@angular/forms/signals';
import { UserService } from '../../../services/user-service';
import { Address, CustomerAccount, UserRole } from '../../../models/user.model';
import { Router } from '@angular/router';

@Component({
  imports: [FormField],
  selector: 'app-admin-new-user',
  styleUrl: './admin-new-user.scss',
  templateUrl: './admin-new-user.html',
})
export class AdminNewUser {
  userService = inject(UserService);
  private router = inject(Router);

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
    city: '',
    role: 'customer'
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
    required(schema.role);

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

  Create(){
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
          role: this.registerForm().role === 'admin' ? UserRole.admin : UserRole.customer,
          deliveryAddress: address
        }
    
        this.userService.Create(customerAccount);
        this.router.navigate(['/admin/users']);
    //role przypisać
  }
}
