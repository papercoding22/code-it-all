class Server {
  private data: string[] = ['Message 1', 'Message 2', 'Message 3', 'Message 4'];
  private clients: ((message: string) => void)[] = [];

  // Polling: Client asks for new data at intervals
  getData(): Promise<string> {
    // Fake return random data with delay
    const randomDelay = Math.floor(Math.random() * 1000) + 1000;
    return new Promise(resolve => {
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * this.data.length);
        resolve(this.data[randomIndex]);
      }, randomDelay);
    }); // Fake return promise
  }

  registerClient(client: (message: string) => void) {
    this.clients.push(client);
  }

  startStreaming() {
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * this.data.length);
      const message = this.data[randomIndex];
      this.clients.forEach(client => client(message));
    }, 1000);
  }
}

export default Server;
