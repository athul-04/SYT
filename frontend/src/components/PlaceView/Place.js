import React from "react";
import {Link, useParams} from 'react-router-dom'

const Place=(props)=>{
    const {userId}=useParams();
    return(
        <div className="place-img-div">
            <img className="place-img" src={props.image} alt="" />
            <Link className='home-nav' to={`/home/${userId}`}>Home</Link>
            <p className="place">{props.name}</p>
            <p className="place-2">{props.quote}</p>
        </div>
    )
}

export default Place