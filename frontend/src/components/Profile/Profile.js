import "./profilestyle.css"
import React from "react"
import Main from './Main'
import ProfilePost from "./ProfilePost"
import { useLoaderData, useParams } from "react-router-dom"
import { json } from 'react-router-dom'
import Update from "./Update"
const Profile=()=>{

    const datas=useLoaderData();
    const [places,setplaces]=React.useState(datas.places)

    const user=datas.user[0];

    const {userId}=useParams();

    const clickHandler=async(e)=>{
        e.preventDefault();
        const postId=e.target.id;
        await fetch("http://localhost:3000/deletePost/"+userId+"/"+postId,{
            headers:{
                "x-access-token":localStorage.getItem("token")
            },
        })
        .then((res)=>{
            return res.json()
            
        })
        .then((data)=>{
            console.log(data)
            setplaces(data)
        })
       
    }

    const all_posts=places.map((post)=>{
        return(
            <ProfilePost {...post} deletehandler={clickHandler}/>
        )
    })

    return(
        <div>
            <Main user={user} post={places} />
            <Update />
            <div className="other-c">
                <div className="rowc">
                    {all_posts}
                </div>
            </div>
        </div>
    )
}


export default Profile;


export const profileLoader=async({request,params})=>{
    var id=params.userId;
    console.log(id)
    const response=await fetch("http://localhost:3000/getProfile/"+id,{
        headers:{
            "x-access-token":localStorage.getItem("token")
        },
    });
    if(!response){
        throw json({message:'Error Happened'},{status:500});
    }
    else{
        // console.log(response)
        var resData=response.json();
        return resData;
    }
}
