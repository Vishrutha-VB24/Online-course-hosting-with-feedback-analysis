import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Label, Input, CardFooter, Button } from ".";

function InstructorLoginForm() {
    const navigate = useNavigate()
    return (
        <form action="">
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Enter your Instructor  credentials correctly</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-1">
                        <Label for='s-username'>Username</Label>
                        <Input id="s-username"/>
                    </div>
                    <div className="space-y-1">
                        <Label for='s-password'>Password</Label>
                        <Input id='s-password'/>
                    </div>
                </CardContent>
                <CardFooter className="flex">
                    <Button className="grow">Login as Instructor</Button>
                    <Button className="grow" variant="link" onClick={()=> navigate('/register/instructor')}>New? Register</Button>
                </CardFooter>
            </Card>
        </form>
    );
}

export default InstructorLoginForm;