import { AspectRatio, ScrollArea } from "@/components";
import { Player } from ".";
import { useEffect, useState } from "react";
import { getCourseVideo } from "@/utils/apis";
import { useParams, useSearchParams } from "react-router-dom";


function VideoPlayer() {
    const {courseId, Id} = useParams();
    const [videoInfo, setVideoInfo] = useState(null);
    useEffect(()=>{
        getCourseVideo(Id)
        .then(res=>{
            console.log(res.data.data)
            setVideoInfo(res.data.data);
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    return (
        <>
        {videoInfo &&
        
        <main className="overflow-x-hidden">
            <ScrollArea className="h-[100vh-3.5rem] px-6 pt-4">
                <AspectRatio ratio={9 / 4}>
                        <Player url={videoInfo.video_url} height={''}></Player>
                </AspectRatio>
                <h1 className="text-3xl font-semibold">{videoInfo.title}</h1>
                <p>{videoInfo.description}</p>
            </ScrollArea>
        </main>
        }
        </>
    );
}

export default VideoPlayer;