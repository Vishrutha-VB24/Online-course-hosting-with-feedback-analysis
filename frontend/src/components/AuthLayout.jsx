/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayout({children, isAuthRequired=true}) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state=> state.auth.status)


    useEffect(()=>{
        if(isAuthRequired == null){
            setLoader(false)
        }else{
            if(isAuthRequired && authStatus !== isAuthRequired){
                console.log('if')
                navigate('/login')
            }
            else if(!isAuthRequired && authStatus !== isAuthRequired){
                console.log('else if')
                console.log(loader)
                navigate('/')

            }
            setLoader(false);
        }
    }, [isAuthRequired, authStatus, navigate])

    return loader ? <h1>loading</h1> : <>{children}</>


}

export default AuthLayout;