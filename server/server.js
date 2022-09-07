const express= require('express');
const app=express(); //initialise as express app
const cors = require('cors');
 
require('dotenv').config({path:"./config.env"});
const port = process.env.PORT || 6000;

//middlewares
app.use(cors());
app.use(express.json());

//mongodb
const con= require('./db/connection');

//using routes
app.use(require('./routes/routes'));

con.then(db=>{
    if(!db)return process.exit(1);
    app.listen(port ,()=>{
        console.log(`server is running on: ${port}`)
    })
    app.on('error', err=> console.log(`failed to connect with http server:${err}`));
    //if error in mongodb connect
}).catch(err=>{
    console.log(`connection failed...! ${error}`);
})


 

