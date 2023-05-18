import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';


const PostComponent =(props)=>{

    const [likes,setLikes]=React.useState(props.post.likedBy.length);
    console.log("props userLiked")
    console.log(props.userLiked)
    const [isLiked,setIsLiked]=React.useState(props.userLiked);
    const [user,setUser]=React.useState(props.useArr)
    console.log("user is")
    console.log(props.useArr)
    // 
    useEffect(()=>{
        setIsLiked(props.userLiked)
        
    },[props.userLiked])
    useEffect(()=>{
        setUser(props.useArr)
    },[props.useArr])
    console.log(isLiked)
    const {userId}=useParams();

    const clickHandler=async(e)=>{
        e.preventDefault();
        console.log("The id of the post is")
        console.log(e.target.id)
        const postId=e.target.id;

        await fetch("http://localhost:3000/like/"+userId +"/" +postId,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                "x-access-token":localStorage.getItem("token"),
            },
            body:JSON.stringify({userId:userId,postId:postId}),
        })
        .then(res => res.json())
        .then(data =>{
            setLikes(data)
            setIsLiked((oldVal)=>oldVal===1?0:1);
        });
            

        
    }

    return(
        <div className="card manual-card">
            <div className="shadow">
                {user && <div ><img className='usr-image' src={user.image} alt="" /></div>}
                {user && <div className='usr-name'>{user.username}</div>}
                <div className="party"><p>{props.post.quote}</p></div>
            </div>
            <div>
                <img className="container-image" src={props.post.image} alt="" />
            </div>
            <div className="shadow-likes">
                <div className="like" ><button className='like-btn' id={props.post._id} onClick={clickHandler}>{isLiked===1?"💙":"❤️"}</button></div>
                <div className="like like-1">{likes>1?`${likes} Likes`:`${likes} Like`}</div>
            </div>
        </div>
    )
}

export default PostComponent;



