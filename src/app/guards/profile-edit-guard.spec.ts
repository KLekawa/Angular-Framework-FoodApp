import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { profileEditGuard } from './profile-edit-guard';

describe('profileEditGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => profileEditGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
