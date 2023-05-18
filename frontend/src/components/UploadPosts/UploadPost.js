import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { json } from 'react-router-dom';

import "./styleupload.css"
const UploadPost=()=>{
    const [image,setImage]=React.useState('');
    const [txt,setTxt]=React.useState("");
    const{userId,placeId}=useParams();
    const navigate=useNavigate();

    const changeTextAreaHandler=(e)=>{
        setTxt(e.target.value);
    }


    const changeHandler=(e)=>{
        console.log(e);
        var reader=new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload=()=>{
            
            setImage(reader.result);
        }
        reader.onerror=error=>{
            console.log("error "+ error)
        }
        
    }

    const clickHandler=async()=>{
        const dataPost=(async()=>{
            var token=localStorage.getItem('token');
            console.log(token)
            const response=await fetch("http://localhost:3000/dataPost/"+userId +"/" +placeId,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                    'x-access-token':localStorage.getItem("token")
                },
                body:JSON.stringify({image:image,textarea:txt}),
            })
            if(response){
                setTimeout(()=>{
                    return navigate(`/home/${userId}/${placeId}`);
                },3000)
                navigate(`/loader`);
                
            }
            if(!response){
                throw json({message:'Error Occured'},{status:500});
            }
            

        });
        dataPost();
    }

    const resetHandler=()=>{
        setImage("");
    }

    return(
    <div className='clr'>
        <div className='mydiv-flex-upload'>
            <div className="center">
                    <textarea name="" className="my-inp" value={txt} cols="30" rows="10" placeholder="Give Something about your post" onChange={changeTextAreaHandler}></textarea>
                <div className="form-input">
                    
                    <div className="preview">
                    { image==="" || image===null ?"":<img src={image} alt="" />}
                    </div>
                    <input type="text" className="my-inp" />
                    <label htmlFor="file-ip-1">Upload Image</label>
                    <input type="file" id="file-ip-1" accept="image/*" onChange={changeHandler}  />
                    
                </div>
            </div> 
            
            <div className='addedimage'>
            { image==="" || image===null ?"":<img src={image} alt="" />}
            
                <div className='buttons'>
                <button className='cancel-btn' onClick={resetHandler}>Cancel</button>
                <button className='post-btn' onClick={clickHandler}>Post</button>
                </div>
            </div>
        </div>
        
    </div>
    
    )
}

export default UploadPost;

