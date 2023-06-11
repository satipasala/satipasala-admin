import { TestBed } from '@angular/core/testing';

import { UserClaimService } from './user-claim.service';

describe('UserClaimService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserClaimService = TestBed.get(UserClaimService);
    expect(service).toBeTruthy();
  });
});
