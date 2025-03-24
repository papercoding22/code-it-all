import { describe, it, expect, vitest } from 'vitest';
import { Peer } from '../Peer';
import { P2PNetwork } from '../P2PNetwork';

// mock console log
console.log = vitest.fn();

describe('P2PNetwork', () => {
  it('should distribute chunks to peers', () => {
    const fileChunks = ['chunk1', 'chunk2', 'chunk3', 'chunk4', 'chunk5'];
    const network = new P2PNetwork(fileChunks);

    const peer1 = new Peer(1);
    const peer2 = new Peer(2);
    const peer3 = new Peer(3);

    network.addPeer(peer1);
    network.addPeer(peer2);
    network.addPeer(peer3);

    network.distributeChunks();

    expect(peer1.fileChunks.size).toBe(1);
    expect(peer2.fileChunks.size).toBe(1);
    expect(peer3.fileChunks.size).toBe(1);
  });

  it('should download the file', () => {
    const fileChunks = ['chunk1', 'chunk2', 'chunk3', 'chunk4', 'chunk5'];
    const network = new P2PNetwork(fileChunks);

    const peer1 = new Peer(1);
    const peer2 = new Peer(2);
    const peer3 = new Peer(3);

    network.addPeer(peer1);
    network.addPeer(peer2);
    network.addPeer(peer3);

    network.distributeChunks();

    const peer4 = new Peer(4);
    network.addPeer(peer4);
    network.downloadFile(peer4);

    expect(peer4.fileChunks.size).toBe(5);
  });
});
