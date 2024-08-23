import { TestBed } from '@angular/core/testing';

import { DonneePublicService } from './donnee-public.service';

describe('DonneePublicService', () => {
  let service: DonneePublicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonneePublicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
