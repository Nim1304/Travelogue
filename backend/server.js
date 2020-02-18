const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const connection = mongoose.connection;
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app=express();

const url='mongodb://127.0.0.1:27017';
mongoose.connect(url,{useNewUrlParser:true,useCreateIndex:true});

connection.once('open',()=>{
    console.log('MongoDB connected');
});

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
});