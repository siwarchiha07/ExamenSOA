const express = require('express');
const db = require('./database');
const produitsRouter = require('./produits'); // routeur produits

const app = express();
const PORT = 3000;

app.use(express.json());

// Route racine
app.get('/', (req, res) => {
  res.json({ message: "Registre de personnes! Choisissez le bon routage!" });
});

// Routes personnes
app.get('/personnes', (req, res) => {
  db.all("SELECT * FROM personnes", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "success", data: rows });
  });
});

app.get('/personnes/:id', (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM personnes WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Personne non trouvée" });
    res.json({ message: "success", data: row });
  });
});

app.post('/personnes', (req, res) => {
  const { nom, adresse } = req.body;
  if (!nom) return res.status(400).json({ error: "Le nom est obligatoire" });
  
  db.run(`INSERT INTO personnes (nom, adresse) VALUES (?, ?)`, [nom, adresse], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Personne ajoutée", data: { id: this.lastID, nom, adresse } });
  });
});

app.put('/personnes/:id', (req, res) => {
  const id = req.params.id;
  const { nom, adresse } = req.body;
  if (!nom) return res.status(400).json({ error: "Le nom est obligatoire" });
  
  db.run(`UPDATE personnes SET nom = ?, adresse = ? WHERE id = ?`, [nom, adresse, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Personne non trouvée" });
    res.json({ message: "Personne mise à jour" });
  });
});

app.delete('/personnes/:id', (req, res) => {
  const id = req.params.id;
  db.run(`DELETE FROM personnes WHERE id = ?`, id, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Personne non trouvée" });
    res.json({ message: "Personne supprimée" });
  });
});
