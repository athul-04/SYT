import React from 'react'
import { Link, useParams } from 'react-router-dom';


const Main=(props)=>{
    const {userId}=useParams();
    const [totalLikess,setTotalLikes]=React.useState(0);


    React.useEffect(()=>{
        props.post.map((p)=>setTotalLikes((oldVal)=>oldVal+p.likedBy.length))
    },[])

    


    return(
        <div className="top">
    
                <div style={{opacity:"0"}}>I am hidden</div>
                <div><Link className="home" to={`/home/${userId}`}>Home</Link></div>
                <div className="flip-card">
                    <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <img className="profile-img" src={props.user.image} alt="Avatar" style={{width:"300px",height:"300px"}} />
                    </div>
                    <div className="flip-card-back">
                        <h1 className='usr_name'>{props.user.username}</h1> 
                        <br></br>
                        <br></br>
                        <p>{`Total Posts : ${props.post.length}`}</p> 
                        <br></br>
                        <p>{`Total Likes : ${totalLikess}`}</p>
                    </div>
                    </div>
                </div>
            
        </div>
    )
}

export default Main;