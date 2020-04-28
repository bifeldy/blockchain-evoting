import { TestBed } from '@angular/core/testing';

import { ElectionService } from './election.service';

describe('ElectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElectionService = TestBed.get(ElectionService);
    expect(service).toBeTruthy();
  });
});
