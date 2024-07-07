import { Button, Card, ScrollArea, Separator } from "@/components";

function Course() {
    const imgUrl = 'https://imgs.search.brave.com/GOb601KJW33yaA6rYKboqkbhCtn5c0DM0cN7S7x73oI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zbHAt/c3RhdGljcy5hc3Rv/Y2tjZG4ubmV0L3N0/YXRpY19hc3NldHMv/c3RhZ2luZy8yM3N1/bW1lci9waG90b3Mv/c3Rvcnl0ZWxsaW5n/LWJsYWRlcy9TdG9y/eXRlbGxpbmdfNTUy/NDE2ODI3LmpwZz93/aWR0aD01ODAmZm9y/bWF0PXdlYnA'
    return (
        <main className="flex flex-col items-start p-8 gap-4 ">
            <div className="w-full max-h-96 grid grid-cols-3 rounded-md  box-content">
                <div className="col-span-1 flex items-center ">
                    <img src={imgUrl} alt="" className="rounded-xl w-full h-auto"/>
                </div>
                <div className="col-span-2 px-6 flex flex-col gap-4 items-start justify-evenly">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-4xl justify-start">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, rem?</h1>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At placeat culpa molestiae delectus! Laudantium, quis? Veniam dolore id ab possimus provident? Qui nulla quaerat maiores. Ratione laborum minima porro unde sed reiciendis eveniet recusandae et, a corrupti blanditiis facere quae excepturi cumque quasi fuga esse. Molestias iusto eligendi sequi debitis?</p>
                    </div>
                    <Button className="flex-shrink bg-cyan-400 text-black hover:bg-cyan-500 text-lg " size="lg">Register to this Course</Button>
                </div>
            </div>
            <Separator></Separator>
            <h1 className="text-2xl font-semibold">Course Content:</h1>
            
        </main>
    );
}

export default Course;