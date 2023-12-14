const db = require("../data/data_base")
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY

router.post('/signup', async (req, res) => {
    try {
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

        const hashedPassword = await bcrypt.hash(password, 10);

        const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
        const result1 = await db.awaitQuery(checkEmailQuery, [sanitizedEmail]);
        if (result1.length > 0) {
            throw new Error("Cet email est déjà utilisé.");
        }

        const addUserQuery = 'INSERT INTO users (name, email, pwd) VALUES (?, ?, ?)';
        await db.awaitQuery(addUserQuery, [sanitizedUsername, sanitizedEmail, hashedPassword]);
        res.status(201).json({ message: 'Utilisateur ajouté avec succès.' });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }

});

router.delete("/:id", async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const query1 = "SELECT * FROM users WHERE id = ?";
        const user = await db.awaitQuery(query1, [id]);
        if(!user.length)
            throw new Error("Produit introuvable")

        const query2 = "DELETE FROM users WHERE id = ?"
        await db.awaitQuery(query2, [id]);
        res.json({message: "Utilisateur supprimer"})
    } catch(e) {
        res.status(400).json({error: e.message})
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Toutes les informations sont requises.' });
        }

        const sanitizedEmail = email.replace(/[^\w\s@.]/gi, '');

        const getUserQuery = 'SELECT * FROM users WHERE email = ?';
        const user = await db.awaitQuery(getUserQuery, [sanitizedEmail]);

        if (user.length === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        const hashedPassword = user[0].pwd;

        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Mot de passe incorrect.' });
        }

        const token = jwt.sign({ userId: user[0].id, userEmail: user[0].email }, secretKey, { expiresIn: '1h' }); 

        res.status(200).json({ message: 'Connexion réussie.', token: token });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});


module.exports = router;
