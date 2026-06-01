//Cargamos las librerías del package.json
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Permite que tu frontend (HTML/JS) haga fetch aquí sin errores
app.use(cors()); 
// Permite que tu servidor entienda datos en formato JSON
app.use(express.json());


// (Ajusta estos datos con los de tu base de datos real de pgAdmin)
const pool = new Pool({
  user: 'postgres',          // Tu usuario de Postgres
  host: 'localhost',         // Como estás en local, es localhost
  database: 'web_peliculas', // El NOMBRE de tu base de datos en pgAdmin
  password: '123456', // Tu contraseña de Postgres
  port: 5432
});


app.get('/api/peliculas', async (req, res) => {
  try {
    // Hacemos la consulta real a la tabla de Docker
    const resultado = await pool.query('SELECT * FROM peliculas');
    
    // Devolvemos las películas de la base de datos al frontend
    res.json(resultado.rows); 
  } catch (error) {
    console.error("Error en la base de datos:", error);
    res.status(500).json({ error: "Error al obtener las películas de la base de datos" });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});