/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Button } from ".";
import { useNavigate } from "react-router-dom";

function AuthButton({className}) {
    const logged_in = useSelector(state => state.auth.status)
    const navigate = useNavigate()    
    return logged_in ?
    <Button className={`${className}`} >Logout</Button> : 
    <Button className={`${className}`} onClick={()=>navigate('/login')}>Login</Button> ;
    
}

export default AuthButton;