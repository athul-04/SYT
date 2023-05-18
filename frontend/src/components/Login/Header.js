import React from "react";
import {Link} from "react-router-dom";
const Header=()=>{

    return(
        <div>
            <div className="navbar">
                <div className="nav-1">
                    <Link  className="link">About</Link>
                </div >
                <div className="nav-2">
                    <Link to='/signup' className="link">Signup</Link>
                </div>
            </div>
            
        </div>
    )
}


export default Header;