const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = path.join(__dirname, 'product.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const productProto = grpc.loadPackageDefinition(packageDefinition);

// Puis créer le client en utilisant le package "cosmetic"
const client = new productProto.cosmetic.ProductService(
  'localhost:50051',  // l'adresse de ton serveur gRPC Product
  grpc.credentials.createInsecure()
);

// Tu peux ensuite appeler des méthodes comme :
client.GetProduct({ product_id: '123' }, (error, response) => {
  if (error) {
    console.error('Erreur:', error);
  } else {
    console.log('Produit:', response.product);
  }
});
