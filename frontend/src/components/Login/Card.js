
import React, { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { json } from 'react-router-dom'
import { useLoaderData } from "react-router-dom";


const Card=()=>{

    const resData=useLoaderData();
    const navigate=useNavigate();
    const [id,setId]=React.useState(0);
    const [formData,setFormData]=React.useState({username:"",password:""});
    const [ccName,setccName]=React.useState('visit visit-2-ad');
    useEffect(()=>{
        const anyUser=resData.filter((user)=>user.username===formData.username && user.password===formData.password);
        if(anyUser.length===1){
            
            setId(anyUser[0]._id);
            setccName("visit");
        }
    },[formData.username,formData.password])
    

    const changeHandler=(e)=>{
        setccName(" visit visit-2-ad")
        const {name,value}=e.target;
        setFormData((oldval)=>{
            return{
                ...oldval,
                [name]:value,
            }
        })

        
    }


    const clickHandler=async(e)=>{
        e.preventDefault();
        setFormData({username:"",password:""});
        await fetch("http://localhost:3000/login/"+id)
        .then(res => {
            console.log(res)
            return res.json();
        })
        .then((data)=>{
            localStorage.setItem("token",data.token)
            console.log(data.token)
            navigate(`/home/${id}`)
        })
        
        
    }

    return(
            <div className="box-container">
                <div className="box-1">
                    <div className="inp">
                        <h3 className="syt">SYT</h3>
                        <input className="inp-1" placeholder="Username" name='username' value={formData.username} onChange={changeHandler} type="text" />
                        <input className="inp-2" placeholder="Password" name='password' value={formData.password} onChange={changeHandler} type="password" />
                        <Link to={``} className={ccName} onClick={clickHandler} >Visit</Link>
                    </div>
                </div>
            </div>
    )

}

export default Card;


export const loginLoader=async({request,params})=>{
    const response=await fetch("http://localhost:3000/getData")
    if(!response){
        throw json({message:'Error Happened'},{status:500});
    }
    else{
        var resData=response.json();
        return resData;
    }
}