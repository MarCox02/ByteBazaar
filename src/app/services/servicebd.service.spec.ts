import { TestBed } from '@angular/core/testing';

import { ServicebdService } from './servicebd.service';

describe('ServicebdService', () => {
  let service: ServicebdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicebdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
