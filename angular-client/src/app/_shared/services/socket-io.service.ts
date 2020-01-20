import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import * as io from 'socket.io-client';

import { PeerJsService } from './peer-js.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  socketUrl = null;
  socketOptions = null;

  public mySocket = null;
  public mySocketInfo = null;
  public mySocketNodes = [];

  constructor(
    private gs: GlobalService,
    private pjs: PeerJsService
  ) {
    const currentTimeStamp = new Date().getTime();
    this.socketUrl = environment.socketIoNetwork;
    this.socketOptions = {
      query: {
        client_id: `AnonymousId-${currentTimeStamp}`,
        client_name: `AnonymousName-${currentTimeStamp}`
      }
    };
  }

  CreateNewSocketIoAndP2PConnection(url = this.socketUrl, opt = this.socketOptions) {
    this.mySocket = io(url, opt);
    this.SocketIoStartedAndReady();
  }

  SocketIoStartedAndReady() {
    this.mySocket.on('connect', () => {
      this.gs.Log(`[SOCKET_CONNECTED] Connected To The Socket Server Tracker`);
    });
    this.mySocket.on('disconnect', reason => {
      this.gs.Log(`[SOCKET_DISCONNECTED] ${reason.replace(/\b[a-zA-Z]/g, str => str.toUpperCase())}`);
      if (reason === 'io server disconnect') {
        this.mySocket.connect();
      }
    });
    this.mySocket.on('reconnecting', attemptNumber => {
      this.gs.Log(`[SOCKET_RECONNECTING] Reconnecting.. ${attemptNumber} Attempt`);
    });
    this.mySocket.on('reconnect', attemptNumber => {
      this.gs.Log(`[SOCKET_RECONNECTED] Reconnected After ${attemptNumber} Attempt`);
      if (this.pjs.myPeer) {
        this.pjs.PeerJsCreateConnectionOut(this.mySocketNodes);
      }
    });
    this.mySocket.on('ping', () => {
      this.gs.Log(`[SOCKET_PING] Pinging Server..`);
    });
    this.mySocket.on('pong', latency => {
      this.gs.Log(`[SOCKET_PONG] Pong! Latency :: ${latency}ms`);
    });
    this.mySocket.on('error', error => {
      this.gs.Log(`[SOCKET_ERROR] ${error.message}`);
    });
    this.mySocket.on('client-id', socketInformation => {
      this.mySocketInfo = socketInformation;
      this.gs.Log(`[SOCKET_INFORMATION] My Socket ClientId :: ${this.mySocketInfo.socketClientId}`);
    });
    this.mySocket.on('add-or-remove-nodes', nodes => {
      this.mySocketNodes = nodes.filter(myScktNds => myScktNds.socketClientId !== this.mySocketInfo.socketClientId);
      this.gs.Log(`[SOCKET_NODES-UPDATED] Total Other Nodes :: ${this.mySocketNodes.length}`);
      if (!this.pjs.myPeer) {
        this.pjs.PeerJsCreateNewPeer(this.mySocketInfo, this.mySocketNodes);
      }
    });
  }
}
