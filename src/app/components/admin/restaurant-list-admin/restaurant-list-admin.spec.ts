import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantListAdmin } from './restaurant-list-admin';

describe('RestaurantListAdmin', () => {
  let component: RestaurantListAdmin;
  let fixture: ComponentFixture<RestaurantListAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantListAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantListAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
