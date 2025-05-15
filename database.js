const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./maBaseDeDonnees.sqlite', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Connecté à la base SQLite.');

  db.run(`CREATE TABLE IF NOT EXISTS personnes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    adresse TEXT
  )`, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      // Optionnel : insérer données initiales
      const personnes = [
        { nom: 'Rahma', adresse: '123 rue A' },
        { nom: 'Siwar', adresse: '456 rue B' },
        { nom: 'Mehrez', adresse: '789 rue C' }
      ];
      personnes.forEach(({nom, adresse}) => {
        db.run(`INSERT INTO personnes (nom, adresse) VALUES (?, ?)`, [nom, adresse]);
      });
    }
  });
  db.run(`CREATE TABLE IF NOT EXISTS produits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    description TEXT,
    prix REAL
  )`, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Table produits créée ou déjà existante');
    }
  });
  
});

module.exports = db;
