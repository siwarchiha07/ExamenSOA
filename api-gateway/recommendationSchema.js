const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Recommendation {
    id: ID!
    title: String!
    category: String!
  }

  type Query {
    recommendations: [Recommendation]
  }
`);
