import { CourseCard, ScrollArea } from "@/components";

function Home() {
    const arr = Array(10).fill(1);
    const ob = {
        title: 'Lorem ipsum dolor sit amet afspoifhaspj;faskjvbspu. fapsudfhaspiubasvjdsnf;asuhfpas9uffoiwg9p',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At, voluptas. Numquam placeat optio nesciunt? Reprehenderit obcaecati est cupiditate et animi.'
    }
    return (
        <>
            <ScrollArea className="h-[calc(100vh-3.5rem)]">
                <hr className="fixed top-14 left-4 w-[calc(100vw-2rem)]  border-zinc-500"/>
                <div className="grid p-8 gap-4 " id="card-grid">
                    {arr.map((val, i)=>(
                        <CourseCard cardInfo={ob} key={i}></CourseCard>
                    ))}
                </div>
            </ScrollArea>
        </>
    );
}

export default Home;