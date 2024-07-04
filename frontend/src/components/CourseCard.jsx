/* eslint-disable react/prop-types */
import { AspectRatio, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from ".";

function CourseCard({cardInfo}) {
    const imgUrl = 'https://pbs.twimg.com/media/GRnk2FjWQAAihEJ?format=jpg&name=medium'
    return (
        <Card className="w-80 cursor-pointer hover:shadow-cyan-400 hover:shadow-lg duration-500 " onClick={()=>{alert("hi")}}>
            <CardHeader className="h-48">
                <div className="h-full w-full flex justify-center bg-slate-100 rounded-md"> 
                    <img src={imgUrl} alt="" className="h-full w-auto object-contain"/>
                </div>
            </CardHeader>
            <CardContent>
                <h1 className="text-xl font-semibold line-clamp-2">{cardInfo.title}</h1>
                <CardDescription className="line-clamp-3">
                    {cardInfo.description}
                </CardDescription>
            </CardContent>
        </Card>
    );
}

export default CourseCard;