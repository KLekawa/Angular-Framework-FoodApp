import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderDetailsAdmin } from './order-details-admin';

describe('OrderDetailsAdmin', () => {
  let component: OrderDetailsAdmin;
  let fixture: ComponentFixture<OrderDetailsAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDetailsAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderDetailsAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
