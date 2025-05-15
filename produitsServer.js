const express = require('express');
const produitsRouter = require('./produits');

const app = express();
const PORT = 4000;

app.use(express.json()); // Pour lire req.body en JSON
app.use('/produits', produitsRouter);

app.listen(PORT, () => {
  console.log(`Serveur produits lancé sur http://localhost:${PORT}`);
});
