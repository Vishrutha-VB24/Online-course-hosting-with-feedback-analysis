import { Outlet } from "react-router-dom";
import bg from '../assets/register-bg.svg'
function Register() {
    return (
        <main className="h-[calc(100vh-3.5rem)] flex items-center justify-center" style={{backgroundImage: `url(${bg})`, backgroundPosition: 'right', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <Outlet></Outlet>
        </main>
    );
}

export default Register;