const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const router=express.Router();
const db = mongoose.connection;
const places=require('./routes/places');
const path=require('path');
// const bodyParser=require('body-parser');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app=express();
app.use(express.json());
app.use(cors());
app.use('/places',places);
app.use('/uploads',express.static('uploads'));

const url='mongodb+srv://sudonim:sudonim_1304@cluster0-yhwnu.mongodb.net/travel?retryWrites=true&w=majority';
// const url='mongodb://127.0.0.1:27017/travel'
mongoose.connect(url,{useNewUrlParser:true,useCreateIndex:true});

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}
app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });


db.once('open',()=>{
    console.log('MongoDB connected');
}); 


app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
});