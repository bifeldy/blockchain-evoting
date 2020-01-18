import { TestBed } from '@angular/core/testing';

import { IpTrackerService } from './ip-tracker.service';

describe('IpTrackerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IpTrackerService = TestBed.get(IpTrackerService);
    expect(service).toBeTruthy();
  });
});
