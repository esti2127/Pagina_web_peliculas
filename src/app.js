const express = require('express')
const app = express()
const router = require('./routes/userRoutes')
require('dotenv').config()



app.use(express.json())

//Routes 

app.use('/api/auth', router)



// Error handling 

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`)
})
// server listen 
