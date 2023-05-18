import React from "react";
import { useParams } from "react-router-dom";
import {Link} from 'react-router-dom'

const Update=()=>{
    const {userId}=useParams();

    return(
        <div className="postbutton-div">
            <Link className="addPost" to={`/updateProfile/${userId}`}>Update Profile</Link>
        </div>
    )

}

export default Update;