import { TestBed, inject } from '@angular/core/testing';

import { SirenService } from './siren.service';

describe('SirenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SirenService]
    });
  });

  it('should be created', inject([SirenService], (service: SirenService) => {
    expect(service).toBeTruthy();
  }));
});
