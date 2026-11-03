import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { UserService } from '../../../services/user-service';

@Component({
  imports: [FormField],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  userService = inject(UserService);

  loginForm = signal({
    email: '',
    password: ''
  });

  private form = form(this.loginForm)

  Login(){
    this.userService.Login(this.loginForm().email, this.loginForm().password);
  }
}
