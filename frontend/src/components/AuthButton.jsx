/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarImage, AvatarFallback, Button, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from ".";
import { Link, useNavigate } from "react-router-dom";
import { logout as logoutApi} from "@/utils/apis";
import { logout } from "@/store/authSlice";
function AuthButton({className}) {
    const authStatus = useSelector(state => state.auth.status)
    const userName = useSelector(state => state.auth.userData?.userName) || ''
    const navigate = useNavigate()
    const role = useSelector(state => state.auth.role)
    const user = useSelector(state => state.auth.useData) 
    const dispatch = useDispatch()
    const handleLogout = ()=>{
        console.log(user)
        console.log(role)
        logoutApi(role)
        .then(()=>{
            dispatch(logout())
        })
        .catch(err =>{
            console.log(err)
            alert("something went wrong while logging out");
        })

    }    
    return authStatus ?
    <DropdownMenu>
        <DropdownMenuTrigger>
                <Avatar className="border hover:border-black duration-200">
                    <AvatarImage src=""></AvatarImage>
                    <AvatarFallback>{userName[0].toUpperCase()}</AvatarFallback>
                </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-32'>
            <Link to='/profile'>
                <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
                <Button variant="link" className="p-0 font-normal h-full" onClick={handleLogout}>
                    Logout
                </Button>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu> : 
    <Button className={`${className}`} onClick={()=>navigate('/login')}>Login</Button> ;
    
}

export default AuthButton;