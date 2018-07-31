import { TestBed, inject } from '@angular/core/testing';

import { BgBoxService } from './bg-box.service';

describe('BgBoxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BgBoxService]
    });
  });

  it('should be created', inject([BgBoxService], (service: BgBoxService) => {
    expect(service).toBeTruthy();
  }));
});
