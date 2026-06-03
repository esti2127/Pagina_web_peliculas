const express = require('express')
const routerRoutes = require('./routes/userRoutes')
const movieRoutes = require('./routes/movieRoutes')
const adminRoutes = require('./routes/adminRoutes')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const yaml = require('js-yaml')
const fs = require('fs')

const app = express()
require('dotenv').config()

//Cors
app.use(cors({ origin: 'http://localhost:3000' }))

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Swagger documentation
const swaggerDocument = yaml.load(fs.readFileSync('./openapi.yaml', 'utf8'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

//Routes 
app.use('/api/auth', routerRoutes)
app.use('/api/movies', movieRoutes)
app.use('/api/admin/movies', adminRoutes)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`)
})

