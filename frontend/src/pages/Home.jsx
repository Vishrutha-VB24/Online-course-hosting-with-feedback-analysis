import { CourseCard, ScrollArea } from "@/components";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
function Home() {
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