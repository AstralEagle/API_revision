const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post("/add", async (req, res) => {
    try {
        const {title, price, description} = req.body;
        if (!title || !price || !description)
            throw new Error("Missing value")

        const query1 = "SELECT * FROM products WHERE title = ?"
        const productWithName = await db.query(query1, [title])

        if(productWithName.length())
            throw new Error("Le produit existe deja")

        const query2 = "INSERT INTO products (title, price, description, created_ad) VALUES (?, ?, ?, ?)"
        const newProduct = await db.query(query2, [title, price, description, Date.now()])

        if(!newProduct)
          throw new Error("Product not created")
        res.status(201).json({message: `${title} created with success`})
    }
    catch(e) {
      res.status(400).json({error: e.message})
    }
})

module.exports = router;
