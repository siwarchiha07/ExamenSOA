const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { json } = require('body-parser');
const { addResolversToSchema } = require('@graphql-tools/schema');
const schemaPromise = require('./recommendationSchema');
const resolver = require('./recommendationResolver');

const app = express();

async function setupServer() {
  try {
    const schema = await schemaPromise;
    const schemaWithResolvers = addResolversToSchema({
      schema,
      resolvers: resolver,
    });

    const server = new ApolloServer({ schema: schemaWithResolvers });
    await server.start();

    app.use('/graphql', json(), expressMiddleware(server));

    const PORT = process.env.PORT || 5002;
    app.listen(PORT, () => console.log(`Recommendation Service running at http://localhost:${PORT}/graphql`));
  } catch (error) {
    console.error('Failed to start the Apollo server:', error);
  }
}

setupServer();
