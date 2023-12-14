const db = require("../data/data_base")
const express = require('express');
const router = express.Router();


router.post('/signup', async (req, res) => {
    try {

        const {username, email, password} = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({message: 'Toutes les informations sont requises.'});
        }

        const sanitizedUsername = username.replace(/[^\w\s]/gi, '');
        const sanitizedEmail = email.replace(/[^\w\s@.]/gi, '');

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({message: 'Le mot de passe ne respecte pas les consignes de sécurité.'});
        }

        const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
        const result1 = await db.awaitQuery(checkEmailQuery, [sanitizedEmail]);
        if (result1.length > 0)
            throw new Error("Cet email est déjà utilisé.")
        const addUserQuery = 'INSERT INTO users (name, email, pwd) VALUES (?, ?, ?)';
        await db.awaitQuery(addUserQuery, [sanitizedUsername, sanitizedEmail, password]);
        res.status(201).json({message: 'Utilisateur ajouté avec succès.'});
    } catch (e) {
        res.status(400).json({error: e.message});
    }

});

module.exports = router;
