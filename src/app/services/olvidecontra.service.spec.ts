import { TestBed } from '@angular/core/testing';

import { OlvidecontraService } from './olvidecontra.service';

describe('OlvidecontraService', () => {
  let service: OlvidecontraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OlvidecontraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
