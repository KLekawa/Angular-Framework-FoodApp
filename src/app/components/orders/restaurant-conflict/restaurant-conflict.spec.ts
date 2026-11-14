import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantConflict } from './restaurant-conflict';

describe('RestaurantConflict', () => {
  let component: RestaurantConflict;
  let fixture: ComponentFixture<RestaurantConflict>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantConflict],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantConflict);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
