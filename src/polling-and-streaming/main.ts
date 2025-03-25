import PollingClient from './PollingClient';
import Server from './Server';
import StreamingClient from './StreamingClient';

function main() {
  const server = new Server();
  const pollingClient = new PollingClient(server);
  new StreamingClient(server);

  console.log('Starting Polling Client...');
  pollingClient.startPolling(2000);

  console.log('Starting Streaming Client...');
  server.startStreaming();
}

export default main;
