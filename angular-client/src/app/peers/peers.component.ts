import { Component, OnInit, AfterViewInit } from '@angular/core';

import { SocketIoService } from '../_shared/services/socket-io.service';
import { P2pGraphService } from '../_shared/services/p2p-graph.service';
import { PeerJsService } from '../_shared/services/peer-js.service';

@Component({
  selector: 'app-peers',
  templateUrl: './peers.component.html',
  styleUrls: ['./peers.component.scss']
})
export class PeersComponent implements OnInit, AfterViewInit {

  constructor(
    private sio: SocketIoService,
    private pjs: PeerJsService,
    private p2pgs: P2pGraphService
  ) {
    sio.CreateNewSocketIoAndP2PConnection();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

}
