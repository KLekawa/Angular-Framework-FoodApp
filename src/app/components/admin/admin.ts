import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderAdmin } from './header-admin/header-admin';

@Component({
  imports: [RouterOutlet, HeaderAdmin],
  selector: 'app-admin',
  styleUrl: './admin.scss',
  templateUrl: './admin.html',
})
export class Admin {}
