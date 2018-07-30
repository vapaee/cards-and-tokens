import { TestBed, inject } from '@angular/core/testing';

import { DragAndDropService } from './drag-and-drop.service';

describe('DragAndDropService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DragAndDropService]
    });
  });

  it('should be created', inject([DragAndDropService], (service: DragAndDropService) => {
    expect(service).toBeTruthy();
  }));
});
