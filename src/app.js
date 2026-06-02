const express = require('express')
const app = express()
const router = require('./routes/userRoutes')
const movieRouter = require('./routes/movieRoutes')
require('dotenv').config()
const multerRouter = require('./routes/multer')

app.use('/api/images', multerRouter)



app.use(express.json())

//Routes 

app.use('/api/auth', router)
app.use('/api/movies', movieRouter)



// Error handling 

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`)
})
// server listen 
