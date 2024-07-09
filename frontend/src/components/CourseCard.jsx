/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription,  CardHeader } from ".";

function CourseCard({cardInfo}) {
    const navigate = useNavigate()
    return (
        <Card className="w-80 cursor-pointer hover:scale-105 hover:shadow-cyan-200  hover:shadow-lg duration-500 " onClick={()=>{navigate(`course/${cardInfo._id}`)}}>
            <CardHeader className="h-48">
                <div className="w-full h-full flex justify-center bg-slate-100 rounded-md" style={{backgroundImage: `url(${cardInfo.tumbnail})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}> 
                </div>
            </CardHeader>
            <CardContent>
                <h1 className="text-xl font-semibold line-clamp-2">{cardInfo.name}</h1>
                <CardDescription className="line-clamp-3">
                    {cardInfo.description}
                </CardDescription>
            </CardContent>
        </Card>
    );
}

export default CourseCard;