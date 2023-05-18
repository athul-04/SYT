import React, { useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux'
import { Form, json, redirect,useNavigate } from 'react-router-dom';
import { userActions } from '../store/userStore';
import {Link} from 'react-router-dom'
import { useLoaderData } from "react-router-dom";


const Card=()=>{

    const [ccName,setccName]=React.useState('visit-2-ad')
    const [progressval,setProgressval]=React.useState(0);
    const [allow,setAllow]=React.useState(0);
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const resData=useLoaderData();
    console.log(resData)
    const formData=useSelector(state=>{
        return{
            username:state.user.username,
            password:state.user.password,
            confirmPassword:state.user.confirmPassword,
        }
    })
    console.log(formData);
    
    useEffect(()=>{
        var pass=formData.password;
        if(pass.match(/[A-Z]/)){
            setProgressval((oldval)=>oldval+1)
        }
        if(pass.match(/\d/)){
            setProgressval((oldval)=>oldval+1)

        }
        if(pass.length>4 ){
            setProgressval((oldval)=>oldval+1)
        }
        if(formData.password.length>0 && formData.password===formData.confirmPassword){
            setAllow(1);

        }
        const anyUser=resData.filter((item)=>item.username===formData.username);
        console.log(anyUser)
        if(anyUser.length>0){
            setAllow(0);
        }

    },[formData.password,formData.confirmPassword,formData.username])

    console.log(allow)

    useEffect(()=>{
        setccName(()=>progressval===3 && allow===1?"visit-2":"visit-2 visit-2-ad");
    },[progressval,allow,formData.confirmPassword])
    
    const changeHandler=(e)=>{
        setProgressval(0);
        setAllow(0);
        const {name,value}=e.target;
        if(name==="username")dispatch(userActions.assignName({username:value}));
        else if(name==="password")dispatch(userActions.assignPassword({password:value}))
        else dispatch(userActions.assignConfirmPassword({confirmPassword:value})) ;
    }

    const check=()=>{
        
        if(formData.password!==""){
            return true
        }
        return false
    }





    const clickHandler=async()=>{
        dispatch(userActions.reFrame());
        if(check()){
            const response=await fetch('http://localhost:3000/addData',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({username:formData.username,password:formData.password})
            })
            if(response){
                return navigate('/');
            }
            if(!response){
                throw json({message:'Error Occured'},{status:500});
            }
        }    
    }


    return(
        <div className="box-container">
            <div className="box-1">
                <div className="inp">
                    <h3 className="syt">SYT</h3>
                    <input className="inp-1" placeholder="Username" name="username" value={formData.username} onChange={changeHandler} type="text" />
                    <input className="inp-2" placeholder="Password" name="password" value={formData.password} onChange={changeHandler} type="password" />
                    <progress className="inp-3"  value={progressval} max={3} varient="progressColor" />
                    <input className="inp-2" placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={changeHandler} type="password" />
                    <Link  onClick={clickHandler} className={ccName} >SignUp</Link>
                </div>
            </div>
        </div>
    )
}

export default Card;


export const signupLoader=async({request,params})=>{
    const response=await fetch("http://localhost:3000/getData")
    if(!response){
        throw json({message:'Error Happened'},{status:500});
    }
    else{
        var resData=response.json();
        return resData;
    }
}