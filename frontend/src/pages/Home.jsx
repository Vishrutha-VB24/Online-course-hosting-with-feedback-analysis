import { CourseCard, ScrollArea } from "@/components";
import { getAllCourse } from "@/utils/apis";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
function Home() {
    const [courses, setCourses] = useState([]);
    useEffect(()=>{
        getAllCourse()
            .then(res=>{
                console.log(res)
                setCourses(res.data.data);
            })
        .catch(err =>{
            console.log('navigate to error page', err)
        })
    },[])
    useEffect(()=>{
        console.log(courses.length)
    }, [courses])
    const query = useSelector(state => state.search.query);
    return (
        <>
            <ScrollArea className="h-[calc(100vh-3.5rem)]">
                {
                    courses.length != 0 && 
                    <div className="grid p-8 gap-8 place-items-center" id="card-grid">
                        {   
                            courses
                            .filter(course => course.name.toLowerCase().includes(query.toLowerCase()))
                            .map((course)=>(
                                <CourseCard cardInfo={course} key={course._id}></CourseCard>
                            ))
                        }
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                }
                {courses.length == 0 && <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">{"No Courses to display"}</div>}
            </ScrollArea>
        </>
    );
}

export default Home;