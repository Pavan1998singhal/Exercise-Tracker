const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


//DB Uri
const uri = process.env.ATLAS_URI;
//const uri = "mongodb+srv://FirstMern:FirstMern@cluster0-wlc5d.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser : true, useCreateIndex : true, useUnifiedTopology: true}
);
const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log('Mongoose db connection established successfully');
});

//For CRUD operation
const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

app.use('/exercises', exerciseRouter);
app.use('/users',userRouter);


app.listen(port, ()=>{
    console.log(`Server is running on Port: ${port}`);
});