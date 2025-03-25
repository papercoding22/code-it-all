import Server from './Server';

class PollingClient {
  constructor(private server: Server) {}

  startPolling(interval: number) {
    setInterval(async () => {
      const data = await this.server.getData();
      if (data) {
        console.log('Polling:', data);
      }
    }, interval);
  }
}

export default PollingClient;
