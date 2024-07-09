import { Button, CourseCard, ScrollArea } from "@/components";
import { getAllCourse } from "@/utils/apis";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Home() {
    const navigate = useNavigate()
    const [courses, setCourses] = useState([]);
    useEffect(()=>{
        getAllCourse()
            .then(res=>{
                setCourses(res.data.data);
            })
        .catch(err =>{
            console.log('navigate to error page', err)
        })
    },[])

    return (
        <>
            <ScrollArea className="h-[calc(100vh-3.5rem)]">
                <Button onClick={()=>{navigate("/login")}}>He</Button>
                <div className="grid p-8 gap-8 place-items-center" id="card-grid">
                    {
                        courses.map((course)=>{
                            <CourseCard cardInfo={course} key={course._id}></CourseCard>
                        })
                    }
                </div>
                {courses.length == 0 && <div className="flex items-center justify-center">{"No Courses to display"}</div>}
            </ScrollArea>
        </>
    );
}

export default Home;