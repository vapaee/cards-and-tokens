import { TestBed, inject } from '@angular/core/testing';

import { VapaeeUserService } from './vapaee-user.service';

describe('VapaeeUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VapaeeUserService]
    });
  });

  it('should be created', inject([VapaeeUserService], (service: VapaeeUserService) => {
    expect(service).toBeTruthy();
  }));
});
