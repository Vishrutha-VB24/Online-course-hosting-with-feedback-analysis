import { dotStream } from "ldrs";
import { useForm } from "react-hook-form";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Label, Textarea, Input } from ".";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { login } from '@/store/authSlice';
import { useNavigate } from 'react-router-dom';
import { register as registerApi} from "@/utils/apis";
function InstructorRegisterForm() {
    dotStream.register();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit, watch, formState : {errors}} = useForm();
    const [loading, setLoading] = useState(false)
    const registerInstructor = async (data) =>{
        setLoading(true);
        registerApi(data, 'instructor')
            .then(res => {
                console.log(res.data.data)
                dispatch(login({userData: res.data.data}))
                navigate('/')
            })
            .catch(error => {
                console.log(error);
            })
            .finally(()=>{
                setLoading(false);
            })
    }
    const password = watch('password');
    return (
        <form className="relative -top-14" action="" onSubmit={handleSubmit(registerInstructor)}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Instructor Registration</CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-x-8 gap-y-3">
                    <div className="space-y-1">
                    <Label htmlFor='fullname'>
                            {errors.fullname ? 
                            <span className="text-red-500">{errors.fullname.message}</span>:
                            <span>Fullname</span>
                            }
                        </Label>
                        <Input id='fullname' {...register('fullname', {required: 'Fullname required'})} className={`${errors.fullname && "bg-red-50"}`} />
                        
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor='username' >
                            {errors.username ? 
                            <span className="text-red-500">{errors.username.message}</span>:
                            <span>Username</span>
                            }
                        </Label>
                        <Input id='username'  {...register('username', {required: "Username is required"})} className={`${errors.fullname && "bg-red-50"}`}/>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor='email' >
                            {errors.email ? 
                            <span className="text-red-500">{errors.email.message}</span>:
                            <span>Email</span>
                            }
                        </Label>
                        <Input id='email' type='email'  {...register('email', {required: "Email is required"})} className={`${errors.email && "bg-red-50"}`}/>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor='phone' >
                            {errors.phone ? 
                            <span className="text-red-500">{errors.phone.message}</span>:
                            <span>Phone no.</span>
                            }
                        </Label>
                        <Input id='phone' type='number' {...register('phone', {required: "Phone no. is required"})} className={`${errors.phone && "bg-red-50"}`}/>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor='password' >
                            {errors.password ? 
                            <span className="text-red-500">{errors.password.message}</span>:
                            <span>Password</span>
                            }
                        </Label>
                        <Input id='password' {...register('password', {required: "Password is required", validate: value => value.length > 6 || "Password is too short" })} className={`${errors.password && "bg-red-50"}`}/>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor='cpassword' >
                            {errors.cpassword ? 
                            <span className="text-red-500">{errors.cpassword.message}</span>:
                            <span>Confirm Password</span>
                            }
                        </Label>
                        <Input id='cpassword' type="password" {...register('cpassword', {required: 'Confirm password is required', validate: value => value === password || "Passwords doesn't match"} )} className={`${errors.cpassword && "bg-red-50"}`}/>
                    </div>


                    <div className="space-y-1 col-span-2">
                        <Label htmlFor='bio'>
                            {errors.bio ?
                               <span className="text-red-500">{errors.bio.message}</span>:
                               <span>Bio</span>
                         
                            }
                        </Label>
                        <Textarea id="bio" {...register('bio', {required: 'Bio required'})} className={`${errors.fullname && "bg-red-50"} resize-none `}></Textarea>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>
                        {loading && <l-dot-stream size="45" color="white" ></l-dot-stream>}
                        {!loading && "Register"}
                    </Button>  
                </CardFooter>
            </Card>
        </form>
    );
}

export default InstructorRegisterForm;