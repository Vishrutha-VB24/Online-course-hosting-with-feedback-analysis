import { Button, Card, CardDescription, CardHeader, CardTitle, ScrollArea, Separator, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components";
import { getCourse } from "@/utils/apis";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { dotStream } from "ldrs";
import { useSelector } from "react-redux";

function Course() {
    dotStream.register()
    const {courseId} = useParams()
    const [videos, setVideos] = useState([])
    const [course, setCourse] = useState({})
    const [loading, setLoading] = useState(true);
    const registerCourses = useSelector(state => state.auth.userData?.coursesApplied) || []
    const authStatus = useSelector(state => state.auth.status)
    useEffect(()=>{
        setLoading(true);
        getCourse(courseId)
        .then(res => {
            console.log(res.data.data)
            setCourse(res.data.data.course)
            setVideos(res.data.data.videos)

        })
        .catch(err=>{
            console.log(err);
        })
        .finally(()=>{
            setLoading(false);
        })
    }, [])
    return loading ?
        <div className="w-20 h-20 flex absolute top-[calc(50vh-2.5rem)] left-[calc(50vw-2.5rem)] items-center justify-center">
            <l-dot-stream className=""></l-dot-stream> 
        </div>:
        <ScrollArea className="h-[100vh-3.5rem]">
        <main className="flex flex-col items-start p-8 gap-4 ">
            {
                course && 
                <div className="w-full h-[40vh] grid grid-cols-3  rounded-md  box-content">
                    <div className="col-span-1 flex items-center rounded-xl" style={{backgroundImage: `url(${course.thumbnail})`, backgroundSize: 'cover'}}>
                    </div>
                    <div className="col-span-2 px-6 flex flex-col gap-4 items-start justify-evenly">
                        <div className="flex flex-col gap-4">
                            <h1 className="text-4xl justify-start">{course?.name.toUpperCase()}</h1>
                            <p>{course?.description}</p>
                        </div>
                        {
                            !registerCourses?.includes(courseId)  && 
                            <Button className="flex-shrink-0, bg-cyan-400 text-black hover:bg-cyan-500 text-lg" disabled={!authStatus}>
                                {authStatus && 'Register'}
                                {!authStatus && 'Login to Register'}
                            </Button>
                        }
                    </div>
                </div>
            }
            <Separator></Separator>
            <h1 className="text-2xl font-semibold">Course Content:</h1>
            <div className="flex justify-center w-full">
                <ul className=" w-full grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-6">
                    {
                        videos.map((video, i)=>(
                        <Link key={i} disable={registerCourses.includes(courseId)} to={`/course/${courseId}/video/${video._id}`}>
                            <li className="w-full flex justify-center">
                                <Card className="bg-gradient-to-tr from-blue-200 to-cyan-200 relative w-80" style={{backgroundImage: video.thumbnail}}>
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
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </main>
        </ScrollArea>
        ;
}

export default Course;