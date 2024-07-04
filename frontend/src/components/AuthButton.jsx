/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Button } from ".";
function AuthButton({className}) {
    const logged_in = useSelector(state => state.auth.status)
    
    return logged_in ?
    <Button className={`${className}`}>Logout</Button> : 
    <Button className={`${className}`}>Login</Button> ;
    
}

export default AuthButton;