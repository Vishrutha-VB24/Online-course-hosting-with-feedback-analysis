import { AddVideoButton, Button, ScrollArea, Separator, Table, TableBody, TableCell, TableRow } from "@/components";
import { getCourseInfo } from "@/utils/apis";
import { TrashIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function CourseInfo() {
    const {courseID} = useParams()
    const [courseInfo, setCourseInfo] = useState()
    useEffect(()=>{
        getCourseInfo(courseID)
        .then(res=>{
            console.log(res.data.data)
            setCourseInfo(res.data.data)
        })
        .catch(err=>{
            console.log(err)
        })
        
    },[])
    return courseInfo && (
        <ScrollArea className="h-[calc(100vh-3.5rem)] p-12">

            <h1 className="text-2xl mb-2">{courseInfo.course.name.toUpperCase()}</h1>
            <p>{courseInfo.course.description}</p>
            <Separator className="my-4"/>
            <div className="flex items-center justify-between">
                <h1 className="text-xl">Total Videos ({courseInfo.videos.length})</h1>
                <div className="flex justify-end"><AddVideoButton courseId={courseInfo.course._id} courseName={courseInfo.course.name}></AddVideoButton></div>
            </div>
            <Table>
                <TableBody>
                    {courseInfo.videos.map(video=>(
                        <TableRow key={video._id}>
                            <TableCell>
                                {video.title}
                            </TableCell>
                            <TableCell>
                                <div className="felx justify-end">
                                    <Button size="ghost" className="bg-transparent hover:bg-red-300 p-1">
                                        <TrashIcon color="black"></TrashIcon>
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </ScrollArea>
    );
}

export default CourseInfo;