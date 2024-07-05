/* eslint-disable react/prop-types */
import { Card, CardContent, CardDescription,  CardHeader } from ".";

function CourseCard({cardInfo}) {
    const imgUrl = 'https://pbs.twimg.com/media/GRnaeYQXAAAM-a1?format=jpg&name=medium'
    return (
        <Card className="w-80 cursor-pointer hover:scale-105 hover:shadow-cyan-200  hover:shadow-lg duration-500 " onClick={()=>{alert("hi")}}>
            <CardHeader className="h-48">
                <div className="w-full h-full flex justify-center bg-slate-100 rounded-md"> 
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