import { dotStream } from 'ldrs';
import { useForm } from "react-hook-form";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label } from ".";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '@/utils/apis';
import { login as authLogin } from '@/store/authSlice';
function InstructorLoginForm() {
    dotStream.register();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit, formState : {errors}} = useForm();
    const [loading, setLoading] = useState(false)
    const login = (data) => {
        setLoading(true);
        loginApi(data, 'instructor')
            .then(res => {
                const { instructor } = res.data.data;
                console.log(instructor)
                dispatch(authLogin(instructor))
                navigate("/")
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
                    <CardDescription>Enter your Instructor  credentials correctly</CardDescription>
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
                    <Button className="grow">
                        {loading && <l-dot-stream size="45"></l-dot-stream>}
						{!loading && "Login as Instructor"}
                    </Button>
                    <Button className="grow" variant="link" onClick={()=> navigate('/register/instructor')}>New? Register</Button>
                </CardFooter>
            </Card>
        </form>
    );
}

export default InstructorLoginForm;