import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

declare var Peer: any;

@Injectable({
  providedIn: 'root'
})
export class IpTrackerService {

  tempClientId = prompt(
    'Enter x-client-id !',
    `x-client-id-is-up-to-you-user-${Math.floor(Math.random() * 10)}`
  );

  socketUrl = '127.0.0.1:81';
  socketOptions = {
    query: {
      client_id: this.tempClientId
    }
  };

  peersJsNetwork = {
    host: 'localhost', port: 82, path: '/peer',
  };

  mySocket = null;
  mySocketInfo = null;
  mySocketNodes = [];

  myPeer = null;
  myPeerConnection = [];
  myPeerNodesOut = [];
  myPeerNodesIn = [];
  myPeerMaxConnectionsOut = 5;

  constructor() {
    this.mySocket = io(this.socketUrl, this.socketOptions);
    this.SocketIoStartedAndReady();
  }

  SocketIoStartedAndReady() {
    this.mySocket.on('connect', () => {
      console.log(`[SOCKET_CONNECTED] Connected To The Socket Server Tracker`);
    });
    this.mySocket.on('disconnect', reason => {
      console.log(`[SOCKET_DISCONNECTED] ${reason.replace(/\b[a-zA-Z]/g, str => str.toUpperCase())}`);
      if (reason === 'io server disconnect') {
        this.mySocket.connect();
      }
    });
    this.mySocket.on('reconnecting', attemptNumber => {
      console.log(`[SOCKET_RECONNECTING] Reconnecting.. ${attemptNumber} Attempt`);
    });
    this.mySocket.on('reconnect', attemptNumber => {
      console.log(`[SOCKET_RECONNECTED] Reconnected After ${attemptNumber} Attempt`);
      if (this.myPeer) {
        this.PeerJsCreateConnectionOut();
      }
    });
    this.mySocket.on('ping', () => {
      console.log(`[SOCKET_PING] Pinging Server..`);
    });
    this.mySocket.on('pong', latency => {
      console.log(`[SOCKET_PONG] Pong! Latency :: ${latency}ms`);
    });
    this.mySocket.on('error', error => {
      console.log(`[SOCKET_ERROR] ${error.message}`);
    });
    this.mySocket.on('client-id', socketInformation => {
      this.mySocketInfo = socketInformation;
      console.log(`[SOCKET_INFORMATION] My Socket ClientId :: ${this.mySocketInfo.socketClientId}`);
      if (!this.myPeer) {
        const peer = new Peer(this.mySocketInfo.socketClientId, {
          host: this.peersJsNetwork.host, port: this.peersJsNetwork.port, path: this.peersJsNetwork.path,
          config: {
            iceServers: this.mySocket.socketIceServer
          }
        });
        this.myPeer = peer;
        this.PeerJsStartedAndReady();
      }
    });
    this.mySocket.on('add-or-remove-nodes', nodes => {
      this.mySocketNodes = nodes.filter(myScktNds => myScktNds.socketClientId !== this.mySocketInfo.socketClientId);
      console.log(`[SOCKET_NODES-UPDATED] Total Other Nodes :: ${this.mySocketNodes.length}`);
    });
  }

  ShuffleArray(array) {
    let currentIndex = array.length;
    let temporaryValue = null;
    let randomIndex = null;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  PeerJsStartedAndReady() {
    this.myPeer.on('open', peerId => {
      console.log(`[PEER_OPENED] My PeerId :: ${peerId}`);
      this.PeerJsCreateConnectionOut();
    });
    this.myPeer.on('disconnected', () => {
      console.log('[PEER_DISCONNECTED] Connection To Peer Server Tracker Loss');
    });
    this.myPeer.on('connection', conn => {
      console.log(`[PEER_INCOMING-CONNECTION] Connection From PeerId :: ${conn.peer}`);
      this.ConnectionHandler(conn, 'connection-in');
    });
    this.myPeer.on('error', error => {
      console.log(`[PEER_ERROR] ${error.message}`);
    });
  }

  PeerJsCreateConnectionOut() {
    if (this.mySocketNodes.length > 0 && this.myPeerNodesOut.length <= this.myPeerMaxConnectionsOut) {
      console.log(`[PEER_FINDING] Finding Nework Peers`);
      const myPeerNodesShuffle = this.ShuffleArray(this.mySocketNodes);
      for (const mPrNdsShffl of myPeerNodesShuffle) {
        const myPeerNodesOutIdx = this.myPeerNodesOut.findIndex(prNds => prNds === mPrNdsShffl.socketClientId);
        const myPeerNodesInIdx = this.myPeerNodesIn.findIndex(prNds => prNds === mPrNdsShffl.socketClientId);
        if (myPeerNodesOutIdx >= 0 || myPeerNodesInIdx >= 0) {
          continue;
        } else if (this.myPeerNodesOut.length >= this.myPeerMaxConnectionsOut) {
          break;
        } else {
          console.log(`[PEER_OUTGOING-CONNECTION] Connecting To PeerId :: ${mPrNdsShffl.socketClientId}`);
          this.myPeerNodesOut.push(mPrNdsShffl.socketClientId);
          const conn = this.myPeer.connect(mPrNdsShffl.socketClientId);
          this.ConnectionHandler(conn, 'connection-out');
        }
      }
    }
  }

  ConnectionHandler(conn, type) {
    conn.on('open', () => {
      if (type === 'connection-in') {
        this.myPeerNodesIn.push(conn.peer);
      }
      this.myPeerConnection.push(conn);
      console.log(`[PEER_CONNECTED] Connected To PeerId :: ${conn.peer}`);
      conn.on('data', data => { this.ConnectionDataHandler(conn, data); });
      conn.on('error', error => { this.ConnectionErrorHandler(conn, error); });
      conn.on('close', () => { this.ConnectionCloseHandler(conn); });
    });
  }

  ConnectionDataHandler(conn, data) {
    console.log(`[PEER_DATA] ${conn.peer} :: ${data}`);
  }

  ConnectionErrorHandler(conn, error) {
    console.log(`[PEER_ERROR] ${conn.peer} :: ${error.message}`);
  }

  ConnectionCloseHandler(conn) {
    this.myPeerNodesIn = this.myPeerNodesIn.filter(prCnn => prCnn !== conn.peer);
    this.myPeerNodesOut = this.myPeerNodesOut.filter(prCnn => prCnn !== conn.peer);
    this.myPeerConnection = this.myPeerConnection.filter(prCnn => prCnn.peer !== conn.peer);
    console.log(`[PEER_CLOSED] Connection Closed From PeerId :: ${conn.peer}`);
  }
}
