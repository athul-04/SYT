import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import "./logout.css"
const Logout=()=>{


    useEffect(()=>{
        localStorage.clear();
    },[])



    return(
        <div className='main-log-div'>
            <p style={{opacity:"0"}}>1</p>
            <div class="log-container">
                <h1>Logout</h1>
                <p>You have been successfully logged out.</p>
                <Link to={'/'} class="log" >Log in again</Link>
            </div>
        </div>
    )

}


export default Logout;


