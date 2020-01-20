import { TestBed } from '@angular/core/testing';

import { P2pGraphService } from './p2p-graph.service';

describe('P2pGraphService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: P2pGraphService = TestBed.get(P2pGraphService);
    expect(service).toBeTruthy();
  });
});
