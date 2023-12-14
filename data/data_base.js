require('dotenv').config()
const mysql= require('mysql-await');

const connection = mysql.createConnection({
    host     : process.env.HOST,
    port     : process.env.DBPORT,
    user     : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE
});

connection.connect();

module.exports = connection;
