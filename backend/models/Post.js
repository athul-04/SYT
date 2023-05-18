const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const postSchema=new Schema({
    owner:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    quote:{
        type:String,
    },
    place_id:{
        type:String,
    },
    likedBy:{
        type:Array,
    }
    
})

const Post=mongoose.model("Post",postSchema)

module.exports=Post