import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantDetailsAdmin } from './restaurant-details-admin';

describe('RestaurantDetailsAdmin', () => {
  let component: RestaurantDetailsAdmin;
  let fixture: ComponentFixture<RestaurantDetailsAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantDetailsAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantDetailsAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
