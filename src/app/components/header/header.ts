import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user-service';

@Component({
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  userService = inject(UserService);

  loggedUser = this.userService.isLoggedIn;

  Logout(){
    this.userService.Logout();
  }
}
