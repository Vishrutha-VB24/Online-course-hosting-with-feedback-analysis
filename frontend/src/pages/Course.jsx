import { Button, Card, CardDescription, CardHeader, CardTitle, ScrollArea, Separator, Table, TableBody, TableCell, TableRow, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components";
import { getAllCourseVideos, getCourse } from "@/utils/apis";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { dotStream } from "ldrs";
import { useSelector } from "react-redux";

function Course() {
    dotStream.register()
    const imgUrl = 'https://imgs.search.brave.com/GOb601KJW33yaA6rYKboqkbhCtn5c0DM0cN7S7x73oI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zbHAt/c3RhdGljcy5hc3Rv/Y2tjZG4ubmV0L3N0/YXRpY19hc3NldHMv/c3RhZ2luZy8yM3N1/bW1lci9waG90b3Mv/c3Rvcnl0ZWxsaW5n/LWJsYWRlcy9TdG9y/eXRlbGxpbmdfNTUy/NDE2ODI3LmpwZz93/aWR0aD01ODAmZm9y/bWF0PXdlYnA'
    const {courseId} = useParams()
    const [videos, setVideos] = useState([])
    const [course, setCourse] = useState({})
    const [loading, setLoading] = useState(true);
    const registerCourses = useSelector(state => state.auth.userData?.coursesApplied) || []
    useEffect(()=>{
        setLoading(true);
        getCourse(courseId)
        .then(res => {
            setCourse(res.data.data);
        })
        .catch(err=>{
            console.log(err);
        })
        .finally(()=>{
            setLoading(false);
        })


        getAllCourseVideos(courseId)
        .then(res => {
            setVideos(res.data.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])
    return loading ?
        <div className="w-20 h-20 flex absolute top-[calc(50vh-2.5rem)] left-[calc(50vw-2.5rem)] items-center justify-center">
            <l-dot-stream className=""></l-dot-stream> 
        </div>:
        <ScrollArea className="h-screen">
        <main className="flex flex-col items-start p-8 gap-4 ">
            {
                course && 
                
            }
            <div className="w-full max-h-96 grid grid-cols-3  rounded-md  box-content">
                <div className="col-span-1 flex items-center">
                    <img src={course.thubmnail} alt="" className="rounded-xl w-full h-auto"/>
                </div>
                <div className="col-span-2 px-6 flex flex-col gap-4 items-start justify-evenly">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-4xl justify-start">{course?.name}</h1>
                        <p>{course?.description}</p>
                    </div>
                    {
                        !registerCourses?.includes(courseId)  && 
                        <Button className="flex-shrink-0, bg-cyan-400 text-black hover:bg-cyan-500 text-lg">Register to this Course </Button>
                    }
                </div>
            </div>
            <Separator></Separator>

            <h1 className="text-2xl font-semibold">Course Content:</h1>
            <div className="flex justify-center w-full">
                <ul className=" w-full grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-6">
                    {
                        videos.map((video, i)=>(
                        <Link key={i}>
                            <li className="w-full flex justify-center">
                                <Card className="bg-gradient-to-tr from-blue-200 to-cyan-200 relative w-80">
                                    <div className="absolute bg-gradient-to-br from-slate-500 to-transparent p-1 rounded-ee-sm  bottom-0 right-0 text-white ">20:45</div>
                                    <CardHeader>
                                        <CardHeader>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                            <CardTitle className="line-clamp-2 text-lg">{video.title}</CardTitle>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        {video.title}
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                            <CardDescription className="line-clamp-3">{video.title}</CardDescription>
                                        </CardHeader>
                                    </CardHeader>
                                </Card>
                            </li>
                        </Link>
                        ))
                    }
                </ul>
            </div>
        </main>
        </ScrollArea>
        ;
}

export default Course;