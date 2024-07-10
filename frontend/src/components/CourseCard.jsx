/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription,  CardHeader } from ".";

function CourseCard({cardInfo}) {
    console.log(cardInfo)
    const navigate = useNavigate()
    return (
        <Link to={`course/${cardInfo._id}`}>
            <Card className="w-80 cursor-pointer hover:scale-105 hover:shadow-cyan-200  hover:shadow-lg duration-500 " onClick={()=>{navigate(`course/${cardInfo._id}`)}}>
                <CardHeader className="h-48">
                    <div className="w-full h-full flex justify-center bg-slate-100 rounded-md" style={{backgroundImage: `url(${cardInfo.thumbnail})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}> 
                    </div>
                </CardHeader>
                <CardContent>
                    <h1 className="text-xl font-semibold line-clamp-2">{cardInfo.name}</h1>
                    <CardDescription className="line-clamp-3">
                        {cardInfo.description}
                    </CardDescription>
                </CardContent>
            </Card>
        </Link>
    );
}

export default CourseCard;