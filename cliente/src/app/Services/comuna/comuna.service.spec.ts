import { TestBed, inject } from '@angular/core/testing';

import { ComunaService } from './comuna.service';

describe('ComunaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComunaService]
    });
  });

  it('should be created', inject([ComunaService], (service: ComunaService) => {
    expect(service).toBeTruthy();
  }));
});
