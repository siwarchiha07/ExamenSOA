const fs = require('fs');
const path = require('path');
const { buildSchema } = require('graphql');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);

async function getRecommendationSchema() {
  const schemaPath = path.join(__dirname, 'recommendationSchema.gql');
  try {
    const schemaString = await readFileAsync(schemaPath, { encoding: 'utf8' });
    return buildSchema(schemaString);
  } catch (error) {
    console.error("Error reading schema file:", error);
    throw error;
  }
}

module.exports = getRecommendationSchema();
