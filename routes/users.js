const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post("/", async (req, res) => {
    try {

        const {username, email, password} = req.body;
        const querry = "SELECT * FROM users";

        if (!username)
            throw new Error("Il manque le nom d'utilisateur");

        // const responseQuery = await db.query(querry, [username]);


    }catch(e) {

    }

})

module.exports = router;
