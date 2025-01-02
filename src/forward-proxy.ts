class Server {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  handleRequest(request: string): string {
    console.log(`[Server ${this.name}] Received request: ${request}`);
    return `[Response from Server ${this.name}]: ${request}`;
  }
}

class ForwardProxy {
  private server: Server;

  constructor(server: Server) {
    this.server = server;
  }

  forwardRequest(request: string): string {
    console.log(
      `[Forward Proxy] Forwarding request: "${request}" to the server.`,
    );
    const response = this.server.handleRequest(request);
    console.log(
      `[Forward Proxy] Received response: "${response}" from the server.`,
    );
    return response;
  }
}

class Client {
  private proxy: ForwardProxy;

  constructor(proxy: ForwardProxy) {
    this.proxy = proxy;
  }

  sendRequest(request: string): void {
    console.log(`[Client] Sending request: "${request}" to the proxy.`);
    const response = this.proxy.forwardRequest(request);
    console.log(`[Client] Received response: "${response}" from the proxy.`);
  }
}

const main = () => {
  const server = new Server('A');
  const proxy = new ForwardProxy(server);
  const client = new Client(proxy);

  client.sendRequest('Hello!');
};

export { main as forwardProxyProgram };
