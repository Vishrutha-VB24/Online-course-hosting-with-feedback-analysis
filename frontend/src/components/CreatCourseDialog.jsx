import { Button, DialogFooter, Label, Input, Dialog, DialogTrigger, DialogHeader, DialogTitle, DialogContent, Textarea, Table, TableHeader, TableRow, TableHead} from "@/components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { dotStream } from "ldrs";
import { createCourse as createCourseApi } from "@/utils/apis";
export default function CreateCourseDialog(){
    dotStream.register();
    const {register , handleSubmit, formState: {errors}} = useForm();
    const [loading, setLoading] = useState(false);
    const createCourse = (data)=>{
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('thumbnail', data.thumbnail[0]);
        formData.append('description', data.description);
        setLoading(true);
        createCourseApi(formData)
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
        <>
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create Course</Button>
            </DialogTrigger>
            <DialogContent >
            <form onSubmit={handleSubmit(createCourse)} className="">
                <DialogHeader>
                    <DialogTitle    >
                        Create a new Course
                    </DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-2 p-4">
                    <div>
                        <Label htmlFor='name'>
                            {errors.name ?
                                <span className="text-red-500">{errors.name.message}</span>
                            :
                                "Name"
                            }
                        </Label>
                        <Input id="name" {...register('name' )} className={`${errors.name && "bg-red-50"}`}/>
                    </div>
                    <div>
                        <Label htmlFor='thumbnail'>
                            {errors.thumbnail?
                                <span className="text-red-500">{errors.tumbnail.message}</span>
                            :
                                "Thumbnail"
                            }
                        </Label>
                        <Input id="thumbnail" type="file" {...register('thumbnail' )} className={`${errors.thumbnail && "bg-red-50"}`}/>
                    </div>
                    <div className="col-span-2">
                        <Label htmlFor='Description'>
                            {errors.description ?
                                <span className="text-red-500">{errors.description.message}</span>
                            :
                                "Description"
                            }
                        </Label>
                        <Textarea id="description" {...register('description', )} className={`${errors.description && "bg-red-50"}`}/>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" >
                        {loading && <l-dot-stream size="45" color="white"></l-dot-stream>}
						{!loading && "Create Course"}
                    </Button>
                </DialogFooter>
            </form>
            </DialogContent>
        </Dialog>
        </>
    )
}