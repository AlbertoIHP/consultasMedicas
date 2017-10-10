import { TestBed, inject } from '@angular/core/testing';

import { TiposangreService } from './tiposangre.service';

describe('TiposangreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TiposangreService]
    });
  });

  it('should be created', inject([TiposangreService], (service: TiposangreService) => {
    expect(service).toBeTruthy();
  }));
});
