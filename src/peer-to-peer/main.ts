import { P2PNetwork } from './P2PNetwork';
import { Peer } from './Peer';

function main() {
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

  console.log('Peer 4 chunks:', peer4.fileChunks);
}

export { main as p2pProgram };
