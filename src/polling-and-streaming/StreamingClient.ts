import Server from './Server';

class StreamingClient {
  constructor(private server: Server) {
    this.server.registerClient(this.receiveData);
  }

  receiveData(message: string) {
    console.log('Streaming:', message);
  }
}

export default StreamingClient;
