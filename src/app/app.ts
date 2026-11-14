import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { RestaurantConflict } from './components/orders/restaurant-conflict/restaurant-conflict';

@Component({
  imports: [Header, Footer, RouterOutlet, RestaurantConflict],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('FoodApp');
}
