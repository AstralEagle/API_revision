// const db = require("../data/data_base")
const express = require('express');
const router = express.Router();


router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Toutes les informations sont requises.' });
  }

  const sanitizedUsername = username.replace(/[^\w\s]/gi, '');
  const sanitizedEmail = email.replace(/[^\w\s@.]/gi, '');

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: 'Le mot de passe ne respecte pas les consignes de sécurité.' });
  }

  const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkEmailQuery, [sanitizedEmail], (err, result) => {
    if (err) {
      throw err;
    }

    if (result.length > 0) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    const addUserQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(addUserQuery, [sanitizedUsername, sanitizedEmail, password], (err, result) => {
      if (err) {
        throw err;
      }

      res.status(201).json({ message: 'Utilisateur ajouté avec succès.' });
    });
  });
});

module.exports = router;
