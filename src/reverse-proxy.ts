class Server {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  handleRequest(request: string): string {
    console.log(`[Server ${this.name}] Received request: "${request}"`);
    return `[Response from Server ${this.name}]: Processed "${request}"`;
  }
}

// Reverse Proxy class
class ReverseProxy {
  private servers: Server[];

  constructor(servers: Server[]) {
    this.servers = servers;
  }

  forwardRequest(request: string): string {
    // Simple load balancing: Round-robin strategy
    const serverIndex = Math.floor(Math.random() * this.servers.length);
    const selectedServer = this.servers[serverIndex];

    console.log(
      `[Reverse Proxy] Forwarding request: "${request}" to Server ${selectedServer['name']}`,
    );
    const response = selectedServer.handleRequest(request);
    console.log(
      `[Reverse Proxy] Received response from Server ${selectedServer['name']}`,
    );
    return response;
  }
}

// Client class
class Client {
  private proxy: ReverseProxy;

  constructor(proxy: ReverseProxy) {
    this.proxy = proxy;
  }

  sendRequest(request: string): void {
    console.log(`[Client] Sending request: "${request}"`);
    const response = this.proxy.forwardRequest(request);
    console.log(`[Client] Received response: "${response}"`);
  }
}

const main = () => {
  // Create multiple servers
  const server1 = new Server('1');
  const server2 = new Server('2');
  const server3 = new Server('3');

  // Create a reverse proxy and associate it with the servers
  const reverseProxy = new ReverseProxy([server1, server2, server3]);

  // Create a client and associate it with the proxy
  const client = new Client(reverseProxy);

  // Client sends requests via the reverse proxy
  client.sendRequest('Fetch user data');
  client.sendRequest('Update user profile');
  client.sendRequest('Delete user account');
};

export { main as reverseProxyProgram };
