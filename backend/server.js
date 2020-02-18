const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app=express();


app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
});