const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const WebSocket = require('ws');
const path = require('path');

const PROTO_PATH = path.join(__dirname, 'product.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true, longs: String, enums: String, defaults: true, oneofs: true
});
const cosmeticProto = grpc.loadPackageDefinition(packageDefinition).cosmetic;

function createGrpcClient() {
  return new cosmeticProto.ProductService('localhost:50051', grpc.credentials.createInsecure());
}

const wss = new WebSocket.Server({ port: 8080 });
console.log('Proxy WebSocket en écoute sur ws://localhost:8080');

wss.on('connection', (ws) => {
  const grpcClient = createGrpcClient();
  console.log('Nouveau client WebSocket connecté.');

  ws.on('message', (message) => {
    console.log('Message reçu du client :', message);
    try {
      const request = JSON.parse(message);
      if (request.type === 'getProduct') {
        grpcClient.GetProduct({ product_id: request.product_id }, (err, res) => {
          if (err) return ws.send(JSON.stringify({ error: err.message }));
          ws.send(JSON.stringify({ type: 'product', data: res.product }));
        });
      } else if (request.type === 'getHistory') {
        grpcClient.GetProductHistory({}, (err, res) => {
          if (err) return ws.send(JSON.stringify({ error: err.message }));
          ws.send(JSON.stringify({ type: 'history', data: res.products }));
        });
      }
    } catch (err) {
      ws.send(JSON.stringify({ error: 'Format JSON invalide' }));
    }
  });

  ws.on('close', () => {
    console.log('Client déconnecté.');
  });
});
