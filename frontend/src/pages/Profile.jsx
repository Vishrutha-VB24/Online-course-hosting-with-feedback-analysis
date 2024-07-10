import { Button, DialogFooter, Label, Input, Dialog, DialogTrigger, DialogHeader, DialogTitle, DialogContent, Textarea, Table, TableHeader, TableRow, TableHead, CreateCourseDialog} from "@/components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { dotStream } from "ldrs";
import { createCourse as createCourseApi } from "@/utils/apis";
function Profile() {
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
        <Table className="w-4/5">
            <TableHeader>
                <TableRow>
                <TableHead>Courses</TableHead>
                <TableHead><CreateCourseDialog></CreateCourseDialog></TableHead>
                </TableRow>
            </TableHeader>
        </Table>

        </>
    );
}

export default Profile;