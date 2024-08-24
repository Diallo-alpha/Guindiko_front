import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { menteeGuardGuard } from './mentee-guard.guard';

describe('menteeGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => menteeGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
