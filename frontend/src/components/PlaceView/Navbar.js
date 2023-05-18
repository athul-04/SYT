import React, { useEffect } from 'react'
import { useLoaderData, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'

const Navbar=(props)=>{
    const [search,setSearch]=React.useState("");
    const [val,setVal]=React.useState("");
    const [datas,setDatas]=React.useState([{}]);
    const data=props.data;
    console.log(props)
    console.log("i am in navbar");
    // console.log(data)
    const {userId}=useParams()
    console.log("The")
    console.log(userId)
    const resetNav=()=>{
        setSearch("");
        setVal("");
    }

    useEffect(()=>{
        if(search!==""){
            console.log("i executed for search "+ search)
            const f=data.filter((place)=>place.name.toLowerCase().includes(search.toLowerCase()));
            console.log(f)
            if(f){
                setDatas((oldval)=>{
                    oldval.push(f)
                    return(f)
                })
            }
        }
    },[search])
    const changeHandler=(e)=>{
        setVal(e.target.value)
        setSearch(val);
    }

    
    console.log(datas)
    const final_places=datas.map((item)=>{
        return(
            <li className='res' key={item._id}><Link to={`/home/${userId}/${item._id}`} onClick={resetNav}>{item.name}</Link></li>
        )
    })
    return(
        <div className="wrap-search">
            <div className="input-box">
                <i className="uil uil-search"></i>
                <input type="text" name='search'onChange={changeHandler} value={val}  placeholder="Search here..." />
                <ul className="dum">
                    {search!==""&& final_places}
                </ul>
            </div>
        </div>
    )
}


export default Navbar;
