import { forwardProxyProgram } from './forward-proxy';
import { reverseProxyProgram } from './reverse-proxy';
import { simulateOnlineStoreWithLoadBalancer } from './online-store-load-balancer';

const main = () => {
  // Log title of the program
  console.log('='.repeat(50));
  console.log('Forward Proxy Program');
  forwardProxyProgram();
  console.log('='.repeat(50));
  console.log('Reverse Proxy Program');
  reverseProxyProgram();
  console.log('='.repeat(50));
  console.log('Load Balancer Program');
  simulateOnlineStoreWithLoadBalancer();
};

main();
