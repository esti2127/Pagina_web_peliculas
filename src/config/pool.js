const { Pool } = require('pg');
require('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,

    max: 15,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
};

const pool = new Pool(dbConfig);
pool.on('connect', () => {

    console.log('Pool de PostgreSQL lista para servir películas');

});

pool.on('error', (err) => {

    console.error('Error crítico en la Pool de películas:', err.message);

});

module.exports = { pool };