import { TestBed } from '@angular/core/testing';

import { SocketIoService } from './socket-io.service';

describe('SocketIoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocketIoService = TestBed.get(SocketIoService);
    expect(service).toBeTruthy();
  });
});
