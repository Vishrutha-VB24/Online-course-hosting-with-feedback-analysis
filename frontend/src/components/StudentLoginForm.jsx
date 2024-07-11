import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Label, Input, CardFooter, Button } from ".";
import { useNavigate } from "react-router-dom";
import {  useState } from "react";
import { dotStream } from "ldrs";
import { useDispatch, } from "react-redux";
import { login as authLogin} from "@/store/authSlice";
import {getAllCourse, login as loginApi} from '../utils/apis.js'
function StudentLoginForm() {
    dotStream.register()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [loading, setLoading] = useState(false);
    const login = (data) =>{
        console.log("---------------------")
        setLoading(true);
        loginApi(data, 'student')
            .then(res => {
                const { student} = res.data.data;
                dispatch(authLogin(student))
                navigate("/")
                getAllCourse()
            })
            .catch(error => {
                console.log(error);
            })
            .finally(()=>{
                setLoading(false);
            })
    }
    return (
        <form onSubmit={handleSubmit(login)}>
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Enter your Student credentials correctly</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-1">
                        <Label htmlFor='username'>
                            {errors.username ?
                                <span className="text-red-500">{errors.username.message}</span>
                            :
                                "Username"
                            }
                        </Label>
                        <Input id="username" {...register('username', {required: "Username is Required"})} className={`${errors.password && "bg-red-50"}`}/>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor='password'>
                            {errors.password ?
                                <span className="text-red-500">{errors.password.message}</span>
                            :
                                "Password"
                            }
                        </Label>
                        <Input id="password" {...register('password', {required: "Password is Required"})} className={`${errors.password && "bg-red-50"}`}/>
                    </div>
                </CardContent>
                <CardFooter className="grid grid-cols-2">
                    <Button type="submit">
                        {loading && <l-dot-stream size="45" color="white"></l-dot-stream>}
						{!loading && "Login as Student"}
                    </Button>
                    <Button variant="link" onClick={()=>navigate('/register/student')}>New? Register</Button>
                </CardFooter>
            </Card>
        </form>
    );
}

export default StudentLoginForm;