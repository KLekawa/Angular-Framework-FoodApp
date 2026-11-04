import { Component, computed, inject } from '@angular/core';
import { UserService } from '../../../services/user-service';
import { UserRole } from '../../../models/user.model';

@Component({
  imports: [],
  selector: 'app-users',
  styleUrl: './users.scss',
  templateUrl: './users.html',
})
export class Users {
  private userService = inject(UserService);
  readonly UserRole = UserRole;

  users = computed(() => this.userService.GetAll()); 

  Delete(id: number){
    this.userService.Delete(id);
  }
}
