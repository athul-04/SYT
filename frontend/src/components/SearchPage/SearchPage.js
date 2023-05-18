import React from "react";
import Navbar from "./Navbar";
import { json, useNavigate } from "react-router-dom";
import "./style.css"
import Main from "./Main";
import PlaceCard from "./PlaceCard";
import { useLoaderData } from "react-router-dom";




const SearchPage=()=>{
    const navigate=useNavigate()
    const resData=useLoaderData();
    
    const Places=resData.map((place)=>{
        return(
            <PlaceCard key={place._id} {...place} />
        )
    })

    return(
        <div>
            <Navbar />
            <Main />
            <ul className="cards">
                {Places}
            </ul>

        </div>
    )
}

export default SearchPage;



export const placesLoader=async({request,params})=>{
    var id=params.userId;
    console.log("The acquired_token"+localStorage.getItem("token"))
    // console.log(id)
    const response=await fetch("http://localhost:3000/getPlaces/"+id,{
        headers:{
            "x-access-token":localStorage.getItem("token")
        },
    });
    if(!response.ok){
        throw json({message:'Error Happened'},{status:500});
    }
    else{
        console.log(response)
        
        var resData=response.json();
        
        return resData;
    }
}
