const router=require('express').Router();
let Places=require('../models/places.model');
const multer=require('multer');

const storage=multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename: function(req,file,cb) {
        cb(null,'travelogue_'+Date.now());
    }
});

const fileFilter = (req,file,cb) =>{
    if(file.mimetype == 'image/jpeg' || file.mimetype=='image/png'){
        cb(null,true);
    } else {
        cb(null,false);
    }
}

const upload = multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*5
    },
    fileFilter:fileFilter
});

router.get('/',(req,res)=>{
    Places.find().then((places)=>{
        res.json(places);
    }).catch((err)=>{
        res.status(400).json(err);
    });
});

router.get('/:id',(req,res)=>{
    Places.findOne({_id:req.params.id},(err,result)=>{
        if(err){
            // console.log(`Error:${err}`);
            res.status(400).json(err);
        } else {
            res.json(result);
        }
    });
})

router.post('/delete/:id',(req,res)=>{
    Places.deleteOne({_id:req.params.id},(err)=>{
        if(err){
            console.log(`Error:${err}`);
        } else {
            res.json("success");
        }
    })
});


router.route('/add').post(upload.single('imageData'),(req,res,next)=>{
    const place=req.body.place;
    const desc=req.body.description;
    // const date=Date.parse(req.body.date);

    // console.log(req.body,place,desc);
    var newPlace=new Places({
        place:place,
        description:desc, 
        imageData:'http://localhost:3000/'+req.file.path,
        location:req.body.location
    });
    
    newPlace.save((err)=>{
        if(err){
            console.log(err);
        } else {
            res.status(200).json("Successful");
        }
    })
});

module.exports = router;