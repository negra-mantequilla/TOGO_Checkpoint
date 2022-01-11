// Import express module
const express = require('express')

// const connection = require('./SQL/connection')
// This is where the .env goes which ensures that the password is not visible 
require("dotenv").config()
// Import Router here

const router = require('./routes/routes')


// Invoke express and assign it to a variable 
const app = express()

// This allows us to use the router (middleware)

app.use(express.json())
app.use(router)



// Now we have access to express and all its methods, calling app.

// This is assigning a variable named port with a .env OR port number
const port = process.env.PORT||8005

app.get('/HELLO', (req, res)=>{
  res.json('Hello World')
})



app.listen(port, function(){
  console.log('listening on PORT ', port);
})

