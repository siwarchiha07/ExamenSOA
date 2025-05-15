const express = require('express');
const db = require('./database');

const router = express.Router();

// GET tous les produits
router.get('/', (req, res) => {
  db.all('SELECT * FROM produits', [], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'success', data: rows });
  });
});

// GET un produit par id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM produits WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Produit non trouvé' });
    res.json({ message: 'success', data: row });
  });
});

// POST ajouter un produit
router.post('/', (req, res) => {
  const { nom, description, prix } = req.body;

  if (!nom) {
    return res.status(400).json({ error: "Le champ 'nom' est obligatoire" });
  }
  if (prix === undefined || isNaN(prix)) {
    return res.status(400).json({ error: "Le champ 'prix' est obligatoire et doit être un nombre" });
  }

  db.run(
    'INSERT INTO produits (nom, description, prix) VALUES (?, ?, ?)',
    [nom, description || '', prix],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        message: 'Produit ajouté avec succès',
        data: { id: this.lastID, nom, description, prix }
      });
    }
  );
});

// PUT modifier un produit par id
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { nom, description, prix } = req.body;

  if (!nom) {
    return res.status(400).json({ error: "Le champ 'nom' est obligatoire" });
  }
  if (prix === undefined || isNaN(prix)) {
    return res.status(400).json({ error: "Le champ 'prix' est obligatoire et doit être un nombre" });
  }

  db.run(
    'UPDATE produits SET nom = ?, description = ?, prix = ? WHERE id = ?',
    [nom, description || '', prix, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Produit non trouvé' });
      res.json({ message: 'Produit mis à jour avec succès' });
    }
  );
});

// DELETE un produit par id
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM produits WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Produit non trouvé' });
    res.json({ message: 'Produit supprimé avec succès' });
  });
});

module.exports = router;
