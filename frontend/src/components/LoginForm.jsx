import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger, Label, Input, CardFooter, Button } from ".";

function LoginForm({className}) {
    const navigate = useNavigate()
    return (
        <Tabs defaultValue="student" className={`${className}`}>
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
            </TabsList>
            <TabsContent value="student">
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
                        <CardFooter>
                            <Button >Login as Student</Button>
                            <Button variant="link" onClick={()=>navigate('/register/student')}>New? Register</Button>
                        </CardFooter>
                    </Card>
                </form>
            </TabsContent>
            <TabsContent value="instructor">
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
                        <CardFooter>
                            <Button>Login as Instructor</Button>
                            <Button variant="link" onClick={()=> navigate('/register/instructor')}>New? Register</Button>
                        </CardFooter>
                    </Card>
                </form>
            </TabsContent>
        </Tabs>
    );
}

export default LoginForm;