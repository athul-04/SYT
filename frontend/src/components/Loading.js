
import React from "react";
import ReactLoading from "react-loading";


export default function Loading() {
    return (
        <div style={{width:'100%',height:'100vh'}}>
            <div style={{textAlign:'center',justifyContent:'center',alignItems:'center'}}>
                <ReactLoading type="bars" color="#0000FF" height={100} width={50} />
            </div>
        </div>
    );
}
