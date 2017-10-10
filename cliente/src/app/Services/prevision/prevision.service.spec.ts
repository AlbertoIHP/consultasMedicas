import { TestBed, inject } from '@angular/core/testing';

import { PrevisionService } from './prevision.service';

describe('PrevisionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrevisionService]
    });
  });

  it('should be created', inject([PrevisionService], (service: PrevisionService) => {
    expect(service).toBeTruthy();
  }));
});
