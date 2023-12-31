const db = require("../data/data_base")
const express = require('express');
const router = express.Router();

// /products/
router.get('/', async (req, res) => {
   try{
       const query = "SELECT * FROM products";
       const products = await db.awaitQuery(query);
       res.json(products)
   }
   catch (e) {
       res.status(400).json({error: e.message})
   }
});

// /products/:id
router.get('/:id', async (req, res) => {
    try{
        const id = parseInt(req.params.id)
        const query = "SELECT * FROM products WHERE id = ?";
        const product = await db.awaitQuery(query, [id]);
        if(!product.length)
            throw new Error("Produit introuvable")
        res.json(product);
    }
    catch (e) {
        res.status(400).json({error: e.message})
    }
});


// /products/
router.post("/add", async (req, res) => {
    try {
        const {title, price, description} = req.body;
        if (!title || !price || !description)
            throw new Error("Missing value")

        const query1 = "SELECT * FROM products WHERE title = ?"
        const productWithName = await db.awaitQuery(query1, [title])

        if(productWithName.length)
            throw new Error("Le produit existe deja")

        const query2 = "INSERT INTO products (title, price, description) VALUES (?, ?, ?)"
        const newProduct = await db.awaitQuery(query2, [title, price, description])

        if(!newProduct)
          throw new Error("Product not created")
        res.status(201).json({message: `${title} created with success`})
    }
    catch(e) {
      res.status(400).json({error: e.message})
    }
})

// /products/:id
router.delete("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const query1 = "SELECT * FROM products WHERE id = ?";
        const product = await db.awaitQuery(query1, [id]);
        if(!product.length)
            throw new Error("Produit introuvable")

        const query2 = "DELETE FROM products WHERE id = ?"
        await db.awaitQuery(query2, [id]);
        res.json({message: "Produit supprimer"})
    }
    catch(e) {
        res.status(400).json({error: e.message})
    }
})

module.exports = router;
