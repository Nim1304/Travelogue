const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const router=express.Router();
const db = mongoose.connection;
const places=require('./routes/places');
// const bodyParser=require('body-parser');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app=express();
app.use(express.json());
app.use(cors());
app.use('/places',places);
app.use('/uploads',express.static('uploads'));

const url='mongodb://127.0.0.1:27017/travel';
mongoose.connect(url,{useNewUrlParser:true,useCreateIndex:true});

db.once('open',()=>{
    console.log('MongoDB connected');
}); 


app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
});