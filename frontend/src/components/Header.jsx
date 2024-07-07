import { AuthButton, Input} from ".";
import { useLocation, useNavigate } from "react-router-dom";
function Header() {
    const loc = useLocation();
    const titleOnly = !loc.pathname.startsWith("/login") && !loc.pathname.startsWith("/register") 
    const navigate = useNavigate()

    return (
        <>
            <header className="h-14 flex  px-8 items-center gap-8 justify-between">
            <h2 className="font-bold text-[1.7rem] bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent cursor-pointer" onClick={()=>{navigate('/')}}>Learner&apos;s Point</h2>
            {
                titleOnly && 
                <>
                    <div className="grow  items-center hidden sm:flex max-w-[50vw]">
                        <Input className="rounded-full pl-8 text-lg" placeholder="Search Courses" ></Input>
                    </div>
                    <AuthButton className="min-w-24 text-md hover:text-cyan-400"></AuthButton>
                </>
            }
            </header>
            <hr className="z-10 fixed top-14 left-4 w-[calc(100vw-2rem)]  border-zinc-500"/>
        </>

    );
}

export default Header;