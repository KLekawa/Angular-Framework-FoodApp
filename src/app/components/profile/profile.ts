import { Component, computed, inject, input } from '@angular/core';
import { UserService } from '../../services/user-service';
import { UserRole } from '../../models/user.model';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-profile',
  styleUrl: './profile.scss',
  templateUrl: './profile.html',
})
export class Profile {
  id = input<string>();
  private userService = inject(UserService);
  readonly UserRole = UserRole;

  loggedUser = this.userService.isLoggedIn;

  ifEditMode = computed(() =>{
    const user = this.loggedUser();
    const profileId = Number(this.id());

    return user !== null &&
    (this.userService.ifAdmin() || user.id === profileId);

  })

  user = computed(() =>{
    const id = this.id();
    if(id === undefined)
      return undefined;
    return this.userService.GetById(Number(id));
  })
}
