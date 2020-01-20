import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import Peer from 'peerjs';

import { GlobalService } from './global.service';
import { P2pGraphService } from './p2p-graph.service';

@Injectable({
  providedIn: 'root'
})
export class PeerJsService {

  peersJsNetwork = null;

  public myPeer = null;
  public myPeerConnection = [];
  public myPeerNodesOut = [];
  public myPeerNodesIn = [];
  public myPeerMaxConnectionsOut = 5;
  public myPeerConnectionTimedOut = [];

  constructor(
    private gs: GlobalService,
    private p2pgs: P2pGraphService
  ) {
    this.peersJsNetwork = environment.peersJsNetwork;
  }

  PeerJsCreateNewPeer(mySocketInfo, mySocketNodes, myPeerJsNetwork = this.peersJsNetwork) {
    const peer = new Peer(mySocketInfo.socketClientId, {
      host: myPeerJsNetwork.host,
      port: myPeerJsNetwork.port,
      path: myPeerJsNetwork.path,
      config: {
        iceServers: mySocketInfo.socketIceServer
      },
      debug: myPeerJsNetwork.debug
    });
    this.myPeer = peer;
    this.p2pgs.SetUpMyGraphPeer('.p2p-graph', this.myPeer._id, mySocketInfo.socketClientName);
    this.PeerJsStartedAndReady(mySocketNodes);
  }

  PeerJsStartedAndReady(mySocketNodes) {
    this.myPeer.on('open', peerId => {
      this.gs.Log(`[PEER_OPENED] My PeerId :: ${peerId}`);
      this.PeerJsCreateConnectionOut(mySocketNodes);
    });
    this.myPeer.on('disconnected', () => {
      this.gs.Log('[PEER_DISCONNECTED] Connection To Peer Server Tracker Loss');
    });
    this.myPeer.on('connection', conn => {
      this.gs.Log(`[PEER_INCOMING-CONNECTION] Connection From PeerId :: ${conn.peer}`);
      this.ConnectionHandler(conn, 'connection-in');
    });
    this.myPeer.on('error', error => {
      this.gs.Log(`[PEER_ERROR] ${error.message}`);
    });
  }

  PeerJsCreateConnectionOut(mySocketNodes) {
    console.log(mySocketNodes.length > 0 && this.myPeerNodesOut.length <= this.myPeerMaxConnectionsOut);
    if (mySocketNodes.length > 0 && this.myPeerNodesOut.length <= this.myPeerMaxConnectionsOut) {
      this.gs.Log(`[PEER_FINDING] Finding Nework Peers`);
      const myPeerNodesShuffle = this.gs.ShuffleArray(mySocketNodes);
      for (const mPrNdsShffl of myPeerNodesShuffle) {
        const myPeerNodesOutIdx = this.myPeerNodesOut.findIndex(prNds => prNds === mPrNdsShffl.socketClientId);
        const myPeerNodesInIdx = this.myPeerNodesIn.findIndex(prNds => prNds === mPrNdsShffl.socketClientId);
        if (myPeerNodesOutIdx >= 0 || myPeerNodesInIdx >= 0) {
          continue;
        } else if (this.myPeerNodesOut.length >= this.myPeerMaxConnectionsOut) {
          break;
        } else {
          this.gs.Log(`[PEER_OUTGOING-CONNECTION] Connecting To PeerId :: ${mPrNdsShffl.socketClientId}`);
          this.myPeerNodesOut.push(mPrNdsShffl.socketClientId);
          const conn = this.myPeer.connect(mPrNdsShffl.socketClientId);
          this.ConnectionHandler(conn, 'connection-out');
          this.myPeerConnectionTimedOut[mPrNdsShffl.socketClientId] = setTimeout(() => {
            this.myPeerNodesOut = this.myPeerNodesOut.filter(prCnn => prCnn !== mPrNdsShffl.socketClientId);
            delete this.myPeerConnectionTimedOut[mPrNdsShffl.socketClientId];
            this.gs.Log(`[PEER_CONNECTION-FAILURE] Failed To Connect To PeerId :: ${mPrNdsShffl.socketClientId}`);
          }, 19730);
        }
      }
    }
  }

  ConnectionHandler(conn, type) {
    conn.on('open', () => {
      conn.on('data', data => { this.ConnectionDataHandler(conn, data); });
      conn.on('close', () => { this.ConnectionCloseHandler(conn); });
      if (type === 'connection-in') {
        this.myPeerNodesIn.push(conn.peer);
        this.p2pgs.AddOtherGraphPeer(conn.peer, conn.peer);
        this.p2pgs.ConnectGraphPeer(conn.peer, this.myPeer._id);
      }
      if (type === 'connection-out') {
        clearTimeout(this.myPeerConnectionTimedOut[conn.peer]);
        delete this.myPeerConnectionTimedOut[conn.peer];
        this.p2pgs.AddOtherGraphPeer(conn.peer, conn.peer);
        this.p2pgs.ConnectGraphPeer(this.myPeer._id, conn.peer);
      }
      this.myPeerConnection.push(conn);
      this.gs.Log(`[PEER_CONNECTED] Connected To PeerId :: ${conn.peer}`);
    });
  }

  ConnectionDataHandler(conn, data) {
    this.gs.Log(`[PEER_DATA] ${conn.peer} :: ${data}`);
  }

  ConnectionCloseHandler(conn) {
    this.myPeerNodesIn = this.myPeerNodesIn.filter(prCnn => prCnn !== conn.peer);
    this.myPeerNodesOut = this.myPeerNodesOut.filter(prCnn => prCnn !== conn.peer);
    this.myPeerConnection = this.myPeerConnection.filter(prCnn => prCnn.peer !== conn.peer);
    if (this.p2pgs.CheckLinkDirection(this.myPeer._id, conn.peer)) {
      this.p2pgs.DisconnectGraphPeer(this.myPeer._id, conn.peer);
    } else if (this.p2pgs.CheckLinkDirection(conn.peer, this.myPeer._id)) {
      this.p2pgs.DisconnectGraphPeer(conn.peer, this.myPeer._id);
    }
    this.p2pgs.RemoveOtherGraphPeer(conn.peer);
    this.gs.Log(`[PEER_CLOSED] Connection Closed From PeerId :: ${conn.peer}`);
  }
}
