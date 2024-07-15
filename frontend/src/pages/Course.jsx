import { Button, Card, CardDescription, CardHeader, CardTitle, ScrollArea, Separator, Textarea, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components";
import { courseRegistration, getCourse, getUser } from "@/utils/apis";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { dotStream } from "ldrs";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { postFeedback } from "@/utils/apis";
import { login } from "@/store/authSlice";
function Course() {
    dotStream.register()
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {courseId} = useParams()
    const [videos, setVideos] = useState([])
    const [course, setCourse] = useState({})
    const [loading, setLoading] = useState(true);
    const registerCourses = useSelector(state => state.auth.userData?.coursesApplied) || []
    const authStatus = useSelector(state => state.auth.status)
    const [feedbackLoading, setFeedbackLoading] = useState(false);
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
    const sendFeedback = (data)=>{
        setFeedbackLoading(true);
        postFeedback(courseId, data)
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
        .finally(()=>{
            setFeedbackLoading(false)
        })
    }
    const dispatch = useDispatch();
    
    const handleCourseRegistration = ()=>{
        courseRegistration(courseId)
        .then(res=>{
            console.log(res)
            return getUser()
        })
        .then(res=> {
            console.log(res)
            if(res.data?.data){
                dispatch(login(res.data?.data))
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }
    return loading ?
        <div className="w-20 h-20 flex absolute top-[calc(50vh-2.5rem)] left-[calc(50vw-2.5rem)] items-center justify-center">
            <l-dot-stream className=""></l-dot-stream> 
        </div>:
        <ScrollArea className="h-[calc(100vh-3.5rem)] px-12 py-6">
            {
                course && 
                <div className="w-full h-[40vh] grid grid-cols-3 py-4  rounded-md  box-content">
                    <div className="col-span-1 flex items-center rounded-xl" style={{backgroundImage: `url(${course.thumbnail})`, backgroundSize: 'cover'}}>
                    </div>
                    <div className="col-span-2 px-6 flex flex-col gap-4 items-start justify-evenly">
                        <div className="flex flex-col gap-4">
                            <h1 className="text-4xl justify-start">{course?.name.toUpperCase()}</h1>
                            <p>{course?.description}</p>
                        </div>
                        {
                            !registerCourses?.includes(courseId)  && 
                            <Button className="flex-shrink-0, bg-cyan-400 text-black hover:bg-cyan-500 text-lg" disabled={!authStatus} onClick={handleCourseRegistration}>
                                {authStatus && 'Register'}
                                {!authStatus && 'Login to Register'}
                            </Button>
                        }
                    </div>
                </div>
            }
            <Separator></Separator>
            <h1 className="text-2xl font-semibold">Course Content:</h1>
            <div className="flex justify-center w-full mt-4">
                <ul className=" w-full grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-6 ">
                    {
                        videos.map((video, i)=>(
                        <>
                        <Link key={i} disable={registerCourses.includes(courseId)} to={`/course/${courseId}/video/${video._id}`}>
                            <li className="w-full flex justify-center">
                                <Card className="bg-gradient-to-tr from-blue-200 to-cyan-200 relative w-80" >
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
                        </>
                        ))
                    }
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <h1 className="text-2xl font-semibold">Feedbacks:</h1>
            <div className="grid px-4 py-2">
                <form onSubmit={handleSubmit(sendFeedback)} className="mr-4">
                    <div className="">
                        <Textarea placeholder="Write your review" id="feedback" {...register('feedback', {required: "Feedback required"})} className="w-1/2"></Textarea>
                        <Button type="submit" className="mt-2">
                            {feedbackLoading && <l-dot-stream size="45" color="white"></l-dot-stream>}
                            {!feedbackLoading && "Post"}
                        </Button>
                    </div>
                </form>
            </div>
        </ScrollArea>
        ;
}

export default Course;