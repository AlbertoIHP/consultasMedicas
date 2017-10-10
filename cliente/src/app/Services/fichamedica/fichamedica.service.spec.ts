import { TestBed, inject } from '@angular/core/testing';

import { FichamedicaService } from './fichamedica.service';

describe('FichamedicaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FichamedicaService]
    });
  });

  it('should be created', inject([FichamedicaService], (service: FichamedicaService) => {
    expect(service).toBeTruthy();
  }));
});
