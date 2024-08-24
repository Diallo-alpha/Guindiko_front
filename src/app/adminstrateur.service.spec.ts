import { TestBed } from '@angular/core/testing';

import { AdminstrateurService } from './adminstrateur.service';

describe('AdminstrateurService', () => {
  let service: AdminstrateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminstrateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
