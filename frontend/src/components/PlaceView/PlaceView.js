import { useEffect,useState } from "react";
import Navbar from "../PlaceView/Navbar";
import { json, useLoaderData, useParams } from 'react-router-dom';
import Place from "./Place";
import Posts from './Posts'
import "./style.css"
import PostButton from "./PostButton";



const PlaceView=()=>{
    const {userId}=useParams();
    const [resData,setresData]=useState();
    const placeData =useLoaderData();
    console.log(placeData)
    


    useEffect(()=>{
        const getPlaces=(async()=>{
            var id=userId;
            console.log("The user id is")
            console.log(id)
            await fetch("http://localhost:3000/getPlaces/"+id,{
                headers:{
                    "x-access-token":localStorage.getItem("token")
                },
            })
            .then(res => res.json())
            .then(data => setresData(data));

        });
        getPlaces();
        
    },[userId])
    console.log("resData is")
    console.log(resData);
    console.log("heeeee")
    
    

    

    return(
        <div>
            <Navbar data={resData} />
            <Place {...placeData} />
            <PostButton />
            <div className="images-container-div">
                <Posts />
                
            </div>

        </div>
    )
}

export default PlaceView;


export const placeLoader=async({request,params})=>{
    var id=params.placeId;
    console.log(id)
    const response=await fetch("http://localhost:3000/getPlace/"+id);
    if(!response.ok){
        throw json({message:'Error Happened'},{status:500});
    }
    else{
        console.log("Loading the place")
        var resData=response.json();
        return resData;
    }
}
