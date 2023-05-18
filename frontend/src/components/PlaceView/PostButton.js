import React from "react";
import { useParams } from "react-router-dom";
import {Link} from 'react-router-dom'

const PostButton=()=>{
    const {userId}=useParams();
    const {placeId}=useParams();

    return(
        <div className="postbutton-div">
            <Link className="addPost" to={`/addPost/${userId}/${placeId}`}>Click to add Post</Link>
        </div>
    )

}

export default PostButton;