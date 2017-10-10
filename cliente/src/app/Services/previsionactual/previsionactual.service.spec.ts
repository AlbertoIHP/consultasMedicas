import { TestBed, inject } from '@angular/core/testing';

import { PrevisionactualService } from './previsionactual.service';

describe('PrevisionactualService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrevisionactualService]
    });
  });

  it('should be created', inject([PrevisionactualService], (service: PrevisionactualService) => {
    expect(service).toBeTruthy();
  }));
});
