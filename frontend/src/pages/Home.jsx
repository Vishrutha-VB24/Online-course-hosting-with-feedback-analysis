import { CourseCard, ScrollArea } from "@/components";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";
function Home() {
    const dispatch = useDispatch()
    useEffect(()=>{
        axios.get("http://localhost:8000/api/student/current", { withCredentials: true})
        .then(res =>{
            const userData = res.data?.data;
            console.log(userData)
            if(userData){
                dispatch(login(userData));
            }
        })
        .catch(error =>{
            console.log(error)
        })
        
    }, [])
    const arr = Array(10).fill(1);
    const ob = {
        title: 'Lorem ipsum dolor sit amet afspoifhaspj;faskjvbspu. fapsudfhaspiubasvjdsnf;asuhfpas9uffoiwg9p',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At, voluptas. Numquam placeat optio nesciunt? Reprehenderit obcaecati est cupiditate et animi.'
    }
    return (
        <>
            <ScrollArea className="h-[calc(100vh-3.5rem)]">
                <div className="grid p-8 gap-8 place-items-center" id="card-grid">
                    {arr.map((val, i)=>(
                        <CourseCard cardInfo={ob} key={i}></CourseCard>
                    ))}
                </div>
            </ScrollArea>
        </>
    );
}

export default Home;