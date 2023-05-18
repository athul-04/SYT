import React from 'react'

const ProfilePost=(props)=>{

    
    return(
        <div className="columnc">
            <div className="cardc">
            <button id={props._id} className='del-btn' onClick={props.deletehandler} >🗑️</button>
                <img className='image-card-profile' src={props.image} alt="" />
                <h3 style={{color:"blue"}}>{props.quote}</h3>  
                <h2>{props.likedBy.length>1?`${props.likedBy.length} Likes`:`${props.likedBy.length} Like`}</h2>
            </div>
        </div>
       
    )
}

export default ProfilePost;