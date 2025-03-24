import { Peer } from './Peer';

class P2PNetwork {
  peers: Peer[] = [];
  fileChunks: Map<number, string> = new Map();

  constructor(fileChunks: string[]) {
    fileChunks.forEach((chunk, index) => {
      this.fileChunks.set(index, chunk);
    });

    console.log('P2P Network initialized with file chunks:', this.fileChunks);
  }

  addPeer(peer: Peer) {
    this.peers.push(peer);
    console.log(`Peer ${peer.id} added to the network.`);
  }

  distributeChunks() {
    console.log('Distributing chunks to peers...');
    this.peers.forEach((peer, index) => {
      if (this.fileChunks.has(index)) {
        console.log(`Distributing chunk ${index} to peer ${peer.id}`);
        peer.receiveChunk(index, this.fileChunks.get(index)!);
      }
    });
  }

  downloadFile(requestingPeer: Peer) {
    console.log(
      `Peer ${requestingPeer.id} is attempting to download the file...`,
    );
    const missingChunks = new Set<number>();
    this.fileChunks.forEach((chunk, chunkId) => {
      const sourcePeer = this.peers.find(peer => peer.hasChunk(chunkId));
      if (sourcePeer) {
        const data = sourcePeer.getChunk(chunkId)!;
        console.log(
          `Chunk ${chunkId} found on Peer ${sourcePeer.id}. Transferring to Peer ${requestingPeer.id}`,
        );
        requestingPeer.receiveChunk(chunkId, data);
      } else {
        console.log(
          `Chunk ${chunkId} not found on any peer. Downloading from network...`,
        );
        requestingPeer.receiveChunk(chunkId, this.fileChunks.get(chunkId)!);
      }
    });

    console.log(
      `Peer ${requestingPeer.id} successfully downloaded the complete file.`,
    );
  }
}

export { P2PNetwork };
