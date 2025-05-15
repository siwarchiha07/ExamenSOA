const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, 'product.proto');
const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true, longs: String, enums: String, defaults: true, oneofs: true
});
const cosmeticProto = grpc.loadPackageDefinition(packageDef).cosmetic;

const productHistory = [];

const sampleProduct = {
  id: 'p001',
  name: 'Rouge à lèvres',
  description: 'Un rouge à lèvres longue tenue',
  price: 19.99
};

function getProduct(call, callback) {
  const productId = call.request.product_id;
  const product = { ...sampleProduct, id: productId };
  productHistory.push(product);
  console.log(`Produit demandé : ${productId}`);
  callback(null, { product });
}

function getProductHistory(call, callback) {
  callback(null, { products: productHistory });
}

function main() {
  const server = new grpc.Server();
  server.addService(cosmeticProto.ProductService.service, {
    GetProduct: getProduct,
    GetProductHistory: getProductHistory
  });

  const address = '0.0.0.0:50051';
  server.bindAsync(address, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`Serveur gRPC en écoute sur ${address}`);
    server.start();
  });
}

main();
