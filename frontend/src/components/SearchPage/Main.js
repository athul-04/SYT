import React from 'react'
import { Link, useParams } from 'react-router-dom';



const Main=()=>{
    const {userId}=useParams();
    return(
        <div className="travel-div">
    
            <div className="nodis">hello</div>
            <div className="travel-div-flex" >
                <div className="travel-box"><Link to={`/profile/${userId}`}>Profile</Link></div>
                <div className="travel-box"><Link to={`/logout`}>Logout</Link></div>
            </div>
            <p className="travel-welcome">Welcome to SYT</p>

            <div className="aeroplane-div"><div className="airplaneAnimation">
                <div className="plane">
                <div className="main"></div>
                <div className="wingOne"></div>
                <div className="wingTwo"></div>
                <div className="pollution"></div>
                </div>
                <div className="clouds">
                <div className="cloudOne"></div>
                <div className="cloudTwo"></div>
                <div className="cloudThree"></div>
                </div>
            </div></div>
        </div>
    )
}


export default Main;