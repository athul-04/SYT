import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import PostComponent from "./PostComponent";
const Posts=()=>{
    const {placeId}=useParams();
    const {userId}=useParams()
    const [posts,setPosts]=useState([]);
    const [isLiked,setIsLiked]=useState([])
    const [userArr,setUserArr]=useState([]);
    useEffect(()=>{
        const getPlacePosts=(async()=>{
            const id=placeId;
            console.log("The place id is "+placeId)
            await fetch("http://localhost:3000/getPlacePosts/"+id+"/"+userId,{
                headers:{
                    "x-access-token":localStorage.getItem("token")
                },
            })
            .then((res)=>{ 
                return res.json()
            })
            .then((data)=>{
                console.log(data)
                setPosts(data.p)
                setIsLiked(data.likedArray)
                setUserArr(data.userArr)
            });

        });
        getPlacePosts();
    },[placeId])

    console.log("USer Array is")
    console.log(userArr)
    const final_posts=posts.map((post,index)=>{
        return(
            <PostComponent key={post._id} post={post} userLiked={isLiked[index]} useArr={userArr[index]} />
        )
    })


    return(
        <div className="image-container">
            {final_posts}

        </div>
    )
}

export default Posts