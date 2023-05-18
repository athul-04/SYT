const express=require('express')
const mongoose =require("mongoose");
const User=require('./models/User')
const Place=require('./models/Place')
const bodyParser=require('body-parser')
const cors = require("cors");
const Post = require('./models/Post');
const app=express()
const jwt=require('jsonwebtoken');

app.use(cors());
// app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.text({ limit: '200mb' }));

mongoose.connect('mongodb://localhost:27017/myapp',{
    useNewUrlParser:true,useUnifiedTopology:true
},)
.then(()=>{
    console.log("sucessfully connected")
})
.catch((err)=>console.log(err))

const verifyJWt=(req,res,next)=>{
    const token=req.headers["x-access-token"];
    if(!token){
        res.send("yo, we need token");
    }
    else{
        jwt.verify(token,"jwtsecret",(err,decoded)=>{
            if(err){
                throw new Error('listId does not exist');
            }
            else{
                req.userId=decoded.id;
                console.log("The id is "+req.userId)
                next();
            }
        })
    }
}




app.post('/addData',async(req,res)=>{
 
    var user=new User(req.body);
    user.save();
    
    res.send({message:"hello"})
})

app.get('/getData',async(req,res)=>{
    var item=await User.find();
    
    res.send(item);
})

app.get('/login/:id',async(req,res)=>{
    const id=req.params.id;
    console.log(id)
    const token=jwt.sign({id},"jwtsecret",{
        expiresIn:60000,
    })
    console.log(token)
    res.send({token:token})
})



app.get('/getPlaces/:id',verifyJWt,async(req,res)=>{

  
    if(req.userId!==req.params.id){
        res.status(404).send({message:"User not autenticated"})
    }
    else{
        var id=req.params.id;
        
        var places=await Place.find({})
        console.log(places)
        res.send(places)
    }
})


app.get('/getPlace/:placeId',async(req,res)=>{
    
    var id=req.params.placeId;
    // console.log(id)
  
    var places=await Place.findOne({_id:id})
    // console.log("The places")
    // console.log(places)
    res.send(places)
})

app.get('/getPlacePosts/:placeId/:userId',verifyJWt,async(req,res)=>{
    
    if(req.userId!==req.params.userId){
        res.status(404).send({message:"User not autenticated"})
    }
    
    else{
        
        var id=req.params.placeId;
        var userId=req.params.userId;
        var places=await Place.findOne({_id:id});
        // console.log(places.name)
        var posts=await Post.find({});
        var posts_new=await Post.find({place_id:id})
      
        // console.log(posts_new)
        var likedArray=[];
        posts_new.map((item)=>{
            console.log(item.likedBy)
            var new_item=item.likedBy
            if(new_item.length>0){
                var entered=0;
                new_item.map((i)=>{
                    if(entered===0){
                        if(i===userId){
                            likedArray.push(1);
                            entered=1;
                        }
                    }
                })
            }
            else{
                likedArray.push(0)
            }
        })
        // console.log(posts);
        var place_ids=places.postsIds;
        // console.log(place_ids)
        const arr2=[]
        if(place_ids.length>0){
            var arr1=place_ids.map((it)=>{
                posts.map((i)=>{
                    if(i._id==it){
                        arr2.push(i)
                    }
                })
            })
        }

        var userArr=[];
        const temp_arr=posts_new.map((post)=>{
            return post.owner
        })
        // console.log(temp_arr)
        var users=await User.find({});

        temp_arr.map((i)=>{
            users.map((user)=>{
                if(user._id==i){
                    userArr.push(user)
                }
                
            })
        })
        
        


        console.log("Temp array is")
        console.log(temp_arr)
        console.log(userArr)

        
        // console.log(arr1)
        //arr2 contains the posts that match the likedBy ids in the place collection of the respective page we are visiting eg:Muthumalai
        
        
        res.send({p:arr2,likedArray:likedArray,userArr:userArr})
    }


})

app.post("/dataPost/:userId/:placeId",verifyJWt,async(req,res)=>{
    if(req.userId!==req.params.userId){
        res.status(404).send({message:"User not autenticated"})
    }
    else{
        console.log(req.body);
        var owner=req.params.userId;
        var image=req.body.image;
        var quote=req.body.textarea;
        var place_id=req.params.placeId;
        var post=new Post({owner:owner,image:image,quote:quote,place_id:place_id,likedBy:[]});
        console.log(post._id.toString())
        post.save()
        .then(async()=>{
            console.log("post saved");
            var postids=await Place.findOne({_id:place_id});
            var array=postids.postsIds;
            array.push(post._id.toString());
            await Place.updateOne({_id:place_id},{$set:{postsIds:array}})
            .then(()=>{
                console.log("updated bro");
            })
            console.log("Array is");
            console.log(array)
        })

        

        res.send({name:"Hello"})
    }
})


app.post("/updateProfile/:id",verifyJWt,async(req,res)=>{
    if(req.userId!==req.params.id){
        res.status(404).send({message:"User not autenticated"})
    }
    else{
        console.log(req.body);
        var owner=req.params.id;
        var image=req.body.image;
        
        await User.updateOne({_id:owner},{$set:{image:image}})
        .then(()=>{
            console.log("updated bro no worries")
        })
        res.send({name:"Hello"})
    }

})



app.post("/like/:userId/:postId",verifyJWt,async(req,res)=>{
    if(req.userId!==req.params.userId){
        res.status(404).send({message:"User not autenticated"})
    }
   

    else{
        const userId=req.params.userId;
        const postId=req.params.postId;
        await Post.findOne({_id:postId})
        .then(async(response)=>{
            const likeArray=response.likedBy;
            const ifUser=likeArray.filter((user_id)=>user_id===userId);
            var ansArr=[]
            var updateArr=[]
            if(ifUser.length==0){
                likeArray.push(userId)
                updateArr=likeArray
                ansArr=likeArray.length;
            }
            else{
                if(likeArray.length!=0){
                    ansArr=likeArray.filter((user_id)=>user_id!==userId);
                    updateArr=ansArr
                    ansArr=ansArr.length
                }
            }
            await Post.updateOne({_id:postId},{$set:{likedBy:updateArr}})
            .then(()=>{
                console.log("Like is changed");
                res.status(200).send(ansArr.toString());
            })
            console.log("the likeArray is");
            
            console.log(ansArr)
        })
    }
    


})



app.get('/getProfile/:id',verifyJWt,async(req,res)=>{
    if(req.userId!==req.params.id){
        res.status(404).send({message:"User not autenticated"})
    }
    else{
        var id=req.params.id;
        
        var places=await Post.find({owner:id})
        var user=await User.find({_id:id});

        console.log(places)
        console.log(user)
        res.send({places:places,user:user});
    }
})


app.get("/deletePost/:userId/:postId",verifyJWt,async(req,res)=>{
    if(req.userId!==req.params.userId){
        res.status(404).send({message:"User not autenticated"})
    }
    else{
        var postId=req.params.postId;
        //
        var place=await Post.findOne({_id:postId});
        var placeId=place.place_id;
        //
        await Post.deleteOne({_id:postId})
        var places=await Post.find({owner:req.params.userId})
        //
        var delFormPlaceArray=await Place.findOne({_id:placeId});
        var iniArray=delFormPlaceArray.postsIds;
        var updatedArray=iniArray.filter((item)=>item!==postId);
        await Place.updateOne({_id:placeId},{$set:{postsIds:updatedArray}})


        //
        console.log("hello")
        console.log(places)
        res.send(places)

    }
})


app.listen(3000,()=>{console.log("server is running")})