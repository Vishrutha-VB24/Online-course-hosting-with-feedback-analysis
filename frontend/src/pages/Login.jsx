import { LoginForm } from "@/components";
import backgroundSvg from '../assets/background.svg'
function Login() {
    return (
        <main className="h-[calc(100vh-3.5rem)] flex items-center justify-center" style={{backgroundImage: `url(${backgroundSvg})`, backgroundPosition: 'right', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <LoginForm className="relative -top-14 w-[22rem]" ></LoginForm>
        </main>
    );
}

export default Login;