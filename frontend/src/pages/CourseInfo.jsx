import { AddVideoButton, Button, ScrollArea, Separator, Table, TableBody, TableCell, TableRow } from "@/components";
import { FeedbackChart } from "@/components/FeedbackChart";
import { getCourseInfo } from "@/utils/apis";
import { TrashIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
function CourseInfo() {
    const {courseID} = useParams()
    const [courseInfo, setCourseInfo] = useState();
    const [feedbacks, setFeebacks] = useState([]);
    const calculateFeedbacks = (feedbacklist)=>{
            const ratingCounts = feedbacklist.reduce((acc, feedback) => {
                const { rating } = feedback;
                if (!acc[rating]) {
                    acc[rating] = { rating, count: 0 };
                }
                acc[rating].count += 1;
                return acc;
                }, {});

            const result = Object.values(ratingCounts);
            console.log(result)
    }
    useEffect(()=>{
        getCourseInfo(courseID)
        .then(res=>{
            setCourseInfo(res.data.data)
            setFeebacks(res.data.data.feedbacks)
        })
        .catch(err=>{
            console.log(err)
        })
        
    },[])
    
    return courseInfo && (
        <ScrollArea className="h-[calc(100vh-3.5rem)] p-12">
            <div className="grid grid-cols-3">
                <div className="col-span-2">
                    <h1 className="text-2xl mb-2">{courseInfo.course.name.toUpperCase()}</h1>
                    <p>{courseInfo.course.description}</p>
                </div>
                <div>
                    {
                        feedbacks.length > 0 &&  
                        <FeedbackChart feedbackslist={feedbacks}></FeedbackChart>
                    }
                </div>
            </div>
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
                                <Link to="">
                                    {video.title}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-end">
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