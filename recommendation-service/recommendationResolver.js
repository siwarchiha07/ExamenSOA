let products = [
    { id: '1', name: 'Lipstick Rouge', description: 'Color intense', category: 'Makeup', price: 15.99 },
    { id: '2', name: 'Eyeliner Noir', description: 'Waterproof', category: 'Makeup', price: 9.99 },
    { id: '3', name: 'Shampooing Bio', description: 'Sans sulfate', category: 'Hair', price: 12.5 },
    { id: '4', name: 'Crème Hydratante', description: 'Peaux sensibles', category: 'Skin', price: 18.75 },
  ];
  
  const recommendationResolver = {
    Query: {
      recommendations: (_, { category }) => {
        if (category) {
          return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
        }
        return products;
      },
    },
  };
  
  module.exports = recommendationResolver;
  