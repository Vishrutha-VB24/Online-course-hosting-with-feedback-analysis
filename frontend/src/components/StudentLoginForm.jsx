import { Card, CardHeader, CardTitle, CardDescription, CardContent, Label, Input, CardFooter, Button } from ".";
import { useNavigate } from "react-router-dom";
function StudentLoginForm() {
    const navigate = useNavigate()
    return (
        <form action="">
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Enter your student credentials correctly</CardDescription>
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
                    <Button className="grow">Login as Student</Button>
                    <Button className="grow" variant="link" onClick={()=>navigate('/register/student')}>New? Register</Button>
                </CardFooter>
            </Card>
        </form>
    );
}

export default StudentLoginForm;