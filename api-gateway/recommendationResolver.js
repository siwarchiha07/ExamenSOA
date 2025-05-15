const axios = require('axios');

module.exports = {
  recommendations: async () => {
    const res = await axios.get('http://localhost:4000/recommendations'); // Port recommendation-service
    return res.data;
  }
};
