import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantCardAdmin } from './restaurant-card-admin';

describe('RestaurantCardAdmin', () => {
  let component: RestaurantCardAdmin;
  let fixture: ComponentFixture<RestaurantCardAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantCardAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantCardAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
