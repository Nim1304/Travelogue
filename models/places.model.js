const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placesSchema = new Schema ({
    place : {
        type : String
        // required :true
    },
    description : {
        type : String
        // required :true
    },
    imageData : {
        type:String
    },
    imageName : {
        type:String
    },
    location: {
        type:String
    },
    iframeLocation : {
        type:String
    }
},{
    timestamps:true
});

const Places = mongoose.model('places',placesSchema);

module.exports = Places;