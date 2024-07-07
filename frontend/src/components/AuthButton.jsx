/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Avatar, AvatarImage, AvatarFallback, Button, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from ".";
import { useNavigate } from "react-router-dom";

function AuthButton({className}) {
    const authStatus = useSelector(state => state.auth.status)
    const userName = useSelector(state => state.auth.userData.userName) 
    const navigate = useNavigate()    
    return authStatus ?
    <DropdownMenu>
        <DropdownMenuTrigger>
                <Avatar className="border hover:border-black duration-200">
                    <AvatarImage src=""></AvatarImage>
                    <AvatarFallback>{userName[0].toUpperCase()}</AvatarFallback>
                </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-32'>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu> : 
    <Button className={`${className}`} onClick={()=>navigate('/login')}>Login</Button> ;
    
}

export default AuthButton;