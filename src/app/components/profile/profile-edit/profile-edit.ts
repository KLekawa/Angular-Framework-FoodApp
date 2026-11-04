import { Component, computed, inject, input, signal } from '@angular/core';
import { UserService } from '../../../services/user-service';
import { Address, AdminAccount, CustomerAccount, UserRole } from '../../../models/user.model';
import { form, FormField, validate } from '@angular/forms/signals';
import { Router } from '@angular/router';

@Component({
  imports: [FormField],
  selector: 'app-profile-edit',
  styleUrl: './profile-edit.scss',
  templateUrl: './profile-edit.html',
})
export class ProfileEdit {
  id = input<string>();
  private userService = inject(UserService);
  readonly UserRole = UserRole;
  private router = inject(Router);

  user = computed(() =>{
    const id = this.id();
    if(id === undefined)
      return undefined;
    return this.userService.GetById(Number(id));
  })

  userData = signal({
    name: '',
    email: '',
    phone: '',
    password: '',
    repeatPassword: '',
    street: '',
    buildingNumber: '',
    apartmentNumber: '',
    postalCode: '',
    city: ''
  });

  form = form(this.userData, (schema) =>{
    validate(schema.email, ({ value }) => {
      const email = value().trim().toLowerCase();

      const exists = this.userService.GetAll().some(
        user => 
          user.email.toLowerCase() === email &&
          user.id !== Number(this.id())
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

  Edit(){
    if(this.form().invalid()){
      console.log('Formularz niepoprawny: ', this.form().errorSummary());
      return;
    }

    const oldUser = this.user();

    if (!oldUser) {
      return;
}
    if(oldUser.role === UserRole.customer){
      const address: Address = {
        street: this.userData().street || oldUser.deliveryAddress.street,
        buildingNumber: this.userData().buildingNumber || oldUser.deliveryAddress.buildingNumber,
        apartmentNumber: this.userData().apartmentNumber || oldUser.deliveryAddress.apartmentNumber,
        postalCode: this.userData().postalCode || oldUser.deliveryAddress.postalCode,
        city: this.userData().city || oldUser.deliveryAddress.city,
      }

      const newUser: CustomerAccount = {
        ...oldUser,
        name: this.userData().name || oldUser.name,
        email: this.userData().email || oldUser.email,
        password: this.userData().password || oldUser.password,
        phone: this.userData().phone || oldUser.phone,
        deliveryAddress: address
      }

      this.userService.Update(newUser);
      this.router.navigate(['/profile', this.id()]);
    } else {
        const newUser: AdminAccount = {
          ...oldUser,
          name: this.userData().name || oldUser.name,
          email: this.userData().email || oldUser.email,
          password: this.userData().password || oldUser.password,
          phone: this.userData().phone || oldUser.phone,
        }

      this.userService.Update(newUser);
      this.router.navigate(['/profile', this.id()]);
    }
  }
}
