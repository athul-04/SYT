import React from "react";
import { Link } from "react-router-dom";
import { userActions } from "../store/userStore";
import { useDispatch } from "react-redux";

const Header=()=>{
    const dispatch=useDispatch();
    const clickHandler=()=>{
        dispatch(userActions.reFrame());
    }
    return(
        <div>
            <div className="navbar">
                <div className="nav-1">
                    <Link className="link">About</Link>
                </div >
                <div className="nav-2">
                <Link to={'/'} onClick={clickHandler} className="link">Login</Link>
                </div>
            </div>
        </div>
    )
}


export default Header;