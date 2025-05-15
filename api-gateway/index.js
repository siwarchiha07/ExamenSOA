const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./recommendationSchema');
const resolvers = require('./recommendationResolver');

const grpcClient = require('./proxy');

const app = express();
app.use(cors());
app.use(express.json());

// 🚀 1. Appel gRPC vers product-service
app.get('/products', (req, res) => {
  grpcClient.getAllProducts({}, (err, response) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(response.products);
  });
});

// 🚀 2. Envoi de notification via REST -> Kafka producer
app.post('/notify', async (req, res) => {
  try {
    await axios.post('http://localhost:5001/send', req.body); // 5001 = notification-service port
    res.json({ message: 'Notification envoyée' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur notification Kafka' });
  }
});

// 🚀 3. GraphQL Recommendation
app.use('/recommendation', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true,
}));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API Gateway en écoute sur http://localhost:${PORT}`);
});
