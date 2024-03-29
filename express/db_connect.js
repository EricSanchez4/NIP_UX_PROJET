require('dotenv').config();
const mysql2 = require ("mysql2");

let config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true
};

 const connection =mysql2.createPool(config);
module.exports= { connection };