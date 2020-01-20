import { Injectable } from '@angular/core';

import Graph from 'p2p-graph';

import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class P2pGraphService {

  p2pGraph = null;

  constructor(
    private gs: GlobalService
  ) { }

  SetUpMyGraphPeer(classHtmlElement, myPeerId, myPeerName) {
    this.p2pGraph = new Graph(classHtmlElement);
    this.p2pGraph.add({ id: myPeerId, me: true, name: myPeerName });
    this.gs.Log(`[P2P_GRAPH-INITIALIZED] My PeerId :: ${myPeerId}`);
    this.p2pGraph.on('select', peerId => {
      this.gs.Log(`[P2P_GRAPH-SELECTED] Peer Selected :: ${peerId}`);
    });
  }

  AddOtherGraphPeer(otherPeerId, otherPeerName) {
    this.p2pGraph.add({ id: otherPeerId, name: otherPeerName });
    this.gs.Log(`[P2P_GRAPH-ADDED] Peer Added :: ${otherPeerId}`);
  }

  RemoveOtherGraphPeer(otherPeerId) {
    this.p2pGraph.remove(otherPeerId);
    this.gs.Log(`[P2P_GRAPH-REMOVED] Peer Removed :: ${otherPeerId}`);
  }

  ConnectGraphPeer(fromPeer, toPeer) {
    this.p2pGraph.connect(fromPeer, toPeer);
    this.gs.Log(`[P2P_GRAPH-CONNECTED] Peer Connected :: ${fromPeer} => ${toPeer}`);
  }

  DisconnectGraphPeer(fromPeer, toPeer) {
    this.p2pGraph.disconnect(fromPeer, toPeer);
    this.gs.Log(`[P2P_GRAPH-DISCONNECTED] Peer Disconnected :: ${fromPeer} => ${toPeer}`);
  }

  CheckLinkDirection(fromPeer, toPeer) {
    return this.p2pGraph.hasLink(fromPeer, toPeer);
  }

}
