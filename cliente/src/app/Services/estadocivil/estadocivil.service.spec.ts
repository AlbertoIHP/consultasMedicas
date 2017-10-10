import { TestBed, inject } from '@angular/core/testing';

import { EstadocivilService } from './estadocivil.service';

describe('EstadocivilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstadocivilService]
    });
  });

  it('should be created', inject([EstadocivilService], (service: EstadocivilService) => {
    expect(service).toBeTruthy();
  }));
});
