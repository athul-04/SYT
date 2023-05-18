import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const PlaceCard=(props)=>{
    const {userId}=useParams();
    const navigate=useNavigate();
    const clickHandler=(e)=>{
        e.preventDefault();
        const postId=e.target.id
        return navigate(`/home/${userId}/${postId}`)
    }

    return(
        <li className="cards__item">
                <div className="card">
                <div className="mydiv card"><img className="card-img" src={props.image} alt="" /></div>
                <div className="card__content">
                    <div className="card__title">{props.name}</div>
                    <p className="card__text">{props.quote}</p>
                    <button className="btn btn--block card__btn" id={props._id} onClick={clickHandler}>Visit</button>
                </div>
                </div>
        </li>
    )
}

export default PlaceCard;