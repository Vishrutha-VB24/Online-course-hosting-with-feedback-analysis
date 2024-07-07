/* eslint-disable react/prop-types */
import { Card, CardContent, CardDescription,  CardHeader } from ".";

function CourseCard({cardInfo}) {
    const imgUrl = 'https://imgs.search.brave.com/GOb601KJW33yaA6rYKboqkbhCtn5c0DM0cN7S7x73oI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zbHAt/c3RhdGljcy5hc3Rv/Y2tjZG4ubmV0L3N0/YXRpY19hc3NldHMv/c3RhZ2luZy8yM3N1/bW1lci9waG90b3Mv/c3Rvcnl0ZWxsaW5n/LWJsYWRlcy9TdG9y/eXRlbGxpbmdfNTUy/NDE2ODI3LmpwZz93/aWR0aD01ODAmZm9y/bWF0PXdlYnA'
    return (
        <Card className="w-80 cursor-pointer hover:scale-105 hover:shadow-cyan-200  hover:shadow-lg duration-500 " onClick={()=>{alert("hi")}}>
            <CardHeader className="h-48">
                <div className="w-full h-full flex justify-center bg-slate-100 rounded-md" style={{backgroundImage: `url(${imgUrl})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}> 
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