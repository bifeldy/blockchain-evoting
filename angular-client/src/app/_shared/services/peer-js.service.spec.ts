import { TestBed } from '@angular/core/testing';

import { PeerJsService } from './peer-js.service';

describe('PeerJsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PeerJsService = TestBed.get(PeerJsService);
    expect(service).toBeTruthy();
  });
});
