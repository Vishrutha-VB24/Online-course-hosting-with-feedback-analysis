import { Table, TableHeader, TableRow, TableHead, CreateCourseDialog, Accordion, AccordionItem, AccordionTrigger, AccordionContent, Button, AddVideoButton, Separator, TableBody, TableCell} from "@/components";
import { dotStream } from "ldrs";
import { useEffect, useState } from "react";
import { deleteVideo, instructorCourseVideos, instructorCourses } from "@/utils/apis";
import { Link } from "react-router-dom";
import { TrashIcon } from "@radix-ui/react-icons";
import { useSelector } from "react-redux";

function InstructorProfile() {
    dotStream.register();
    const [courses, setCourses] = useState([]);
    const instructorName = useSelector(state => state.auth.userData.fullName)
    const bio = useSelector(state => state.auth.userData.bio) || ''
    useEffect(() => {
        instructorCourses()
        .then(res => {
            setCourses(res.data.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    
    
    return (
        <>
        <main className="px-12">
            <div className="flex flex-col py-6 gap-1">
                <h1 className="text-2xl">{instructorName}</h1>
                {bio && (<p> {bio}</p>)}
            </div>
            <Separator></Separator>

            <h1 className="font-semibold text-xl mt-6">Your Courses ({courses.length})</h1>
            <Table className="mt-6">
                <TableBody>
                    {
                        courses.map(course => (
                            <TableRow key={course._id}>
                                <TableCell>
                                    <Link to={`/courseInfo/${course._id}`}>
                                        {course.name.toUpperCase()}
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table> 
        </main>
        </>
    );
}

export default InstructorProfile;
