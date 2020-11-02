const express = require('express');
const mongoose = require('mongoose');
const route = require('./route');
const cors = require('cors');
const bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost/postDb');
mongoose.connection.once('connected',()=>{
    console.log("connected to database successfuly")
})
mongoose.connection.on('Error',()=>{
    console.log("Error in connecting")
})
const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use('/api',route)
app.listen(5000,()=>{
    console.log("App is running at port 5000")
})