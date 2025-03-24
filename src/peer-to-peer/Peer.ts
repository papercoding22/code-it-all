class Peer {
  id: number;
  fileChunks: Map<number, string> = new Map();

  constructor(id: number) {
    this.id = id;
  }

  receiveChunk(chunkId: number, data: string) {
    this.fileChunks.set(chunkId, data);
    console.log(`Peer ${this.id} received chunk ${chunkId}: "${data}"`);
  }

  hasChunk(chunkId: number) {
    const hasChunk = this.fileChunks.has(chunkId);
    console.log(`Peer ${this.id} has chunk ${chunkId}: ${hasChunk}`);
    return hasChunk;
  }

  getChunk(chunkId: number): string | undefined {
    return this.fileChunks.get(chunkId);
  }
}

export { Peer };
