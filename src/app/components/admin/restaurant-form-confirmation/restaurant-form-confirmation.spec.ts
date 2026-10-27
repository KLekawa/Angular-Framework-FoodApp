import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantFormConfirmation } from './restaurant-form-confirmation';

describe('RestaurantFormConfirmation', () => {
  let component: RestaurantFormConfirmation;
  let fixture: ComponentFixture<RestaurantFormConfirmation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantFormConfirmation],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantFormConfirmation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
