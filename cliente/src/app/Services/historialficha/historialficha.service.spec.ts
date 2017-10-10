import { TestBed, inject } from '@angular/core/testing';

import { HistorialfichaService } from './historialficha.service';

describe('HistorialfichaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HistorialfichaService]
    });
  });

  it('should be created', inject([HistorialfichaService], (service: HistorialfichaService) => {
    expect(service).toBeTruthy();
  }));
});
