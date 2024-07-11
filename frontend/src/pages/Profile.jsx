import { Button, DialogFooter, Label } from "@/components";
import { Dialog, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "postcss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { dotStream } from "ldrs";
import { createCourse as createCourseApi } from "@/utils/apis";
function Profile() {
    dotStream.register();
    const {register , handleSubmit, formState: {errors}} = useForm();
    const [loading, setLoading] = useState(false);
    const createCourse = (data)=>{
        setLoading(true);
        createCourseApi(data)
        .then(res=>{
            alert("course created succesfully");
        })
        .catch(err=>{
            alert("something went wrong");
        })
        .finally(()=>{
            setLoading(false);
        })
    }
    return (
        <Dialog>
            <DialogTrigger>
                <Button>Create Course</Button>
            </DialogTrigger>
            <form onClick={handleSubmit(createCourse)}>
                <DialogHeader>
                    <DialogTitle>
                        Create a new Course
                    </DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2">
                    <div>
                        <Label htmlFor='name'>
                            {errors.name ?
                                <span className="text-red-500">{errors.name.message}</span>
                            :
                                "Name"
                            }
                        </Label>
                        <Input id="name" {...register('name', {required: "Name is Required"})} className={`${errors.name && "bg-red-50"}`}/>
                    </div>
                    <div>
                        <Label htmlFor='tumbnail'>
                            {errors.description?
                                <span className="text-red-500">{errors.description.message}</span>
                            :
                                "Description"
                            }
                        </Label>
                        <Input id="description" {...register('discription', {required: "Description is Required"})} className={`${errors.password && "bg-red-50"}`}/>
                    </div>
                    <div>
                        <Label htmlFor='firstVideo'>
                            {errors.firstVideo ?
                                <span className="text-red-500">{errors.firstVideo.message}</span>
                            :
                                "First-Video"
                            }
                        </Label>
                        <Input id="firstVideo" {...register('firstVideo', {required: "First-Video is Required"})} className={`${errors.firstVideo && "bg-red-50"}`}/>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="Submit">
                        {loading && <l-dot-stream size="45" color="white"></l-dot-stream>}
						{!loading && "Login as Student"}
                    </Button>
                </DialogFooter>
            </form>
        </Dialog>
    );
}

export default Profile;