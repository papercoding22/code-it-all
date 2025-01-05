type Server = {
  id: number;
  load: number;
};

class LoadBalancer {
  // List of private servers that load balancer manages and distributes the load
  private servers: Server[] = [];
  private currentIndex: number;

  constructor(numServers: number) {
    // Initialize the servers list
    this.servers = Array.from({ length: numServers }, (_, index) => ({
      id: index,
      load: 0,
    }));
    this.currentIndex = 0;
  }

  handleRequest(clientId: number): void {
    // Pick a server using round-robin
    const server = this.servers[this.currentIndex];
    console.log(`Client ${clientId} is handled by Server ${server.id}`);
    server.load++; // Simulate handling the request

    // Simulate request completion after a delay
    setTimeout(
      () => {
        server.load--;
        console.log(
          `Server ${server.id} completed Client ${clientId}'s request`,
        );
      },
      Math.random() * 2000 + 1000,
    ); // 1-3 seconds random delay

    // Move to the next server
    this.currentIndex = (this.currentIndex + 1) % this.servers.length;
  }

  printServerLoads(): void {
    console.log(
      'Current Server Loads:',
      this.servers
        .map(server => `Server ${server.id}: ${server.load} requests`)
        .join(', '),
    );
  }
}

// Simulating the online store
const simulateOnlineStoreWithLoadBalancer = () => {
  const numServers = 3;
  const numClients = 10;

  const loadBalancer = new LoadBalancer(numServers);

  console.log('Online store simulation started!');

  // Simulate clients sending requests
  for (let i = 1; i <= numClients; i++) {
    setTimeout(() => {
      loadBalancer.handleRequest(i);
      loadBalancer.printServerLoads();
    }, i * 500); // Spread client requests over time
  }
};

export { simulateOnlineStoreWithLoadBalancer };
