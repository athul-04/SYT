const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const placeSchema=new Schema({
    name:{
        type:String,
    },
    
    image:{
        type:String,
        required:true,
    },
    quote:{
        type:String,
    },
    description:{
        type:String,
    },
    postsIds:{
        type:Array,
    }
    
})

const Place=mongoose.model("Place",placeSchema)

module.exports=Place