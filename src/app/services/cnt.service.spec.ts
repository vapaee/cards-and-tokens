import { TestBed, inject } from '@angular/core/testing';

import { CntService } from './cnt.service';

describe('CntService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CntService]
    });
  });

  it('should be created', inject([CntService], (service: CntService) => {
    expect(service).toBeTruthy();
  }));
});
