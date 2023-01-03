import { TestBed } from '@angular/core/testing';

import { DeclarationBackendService } from './declaration-backend.service';

describe('DeclarationBackendService', () => {
  let service: DeclarationBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeclarationBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
