import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label } from ".";

function StudentRegisterForm() {
    return (
        <form action="" className="relative -top-14">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Student Registration</CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-x-8 gap-y-3">
                    <div className="space-y-1">
                        <Label for='fullname'>FullName</Label>
                        <Input id='fullname'/>
                    </div>
                    <div className="space-y-1">
                        <Label for='username'>Username</Label>
                        <Input id='username'/>
                    </div>
                    <div className="space-y-1">
                        <Label for='email'>E-mail</Label>
                        <Input id='fullname' type='email'/>
                    </div>
                    <div className="space-y-1">
                        <Label for='phone'>Phone</Label>
                        <Input id='phone' type='number'/>
                    </div>
                    <div className="space-y-1">
                        <Label for='password'>Password</Label>
                        <Input id='password' />
                    </div>
                    <div className="space-y-1">
                        <Label for='c-password'>Confirm Password</Label>
                        <Input id='c-password' />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Register</Button>
                </CardFooter>
            </Card>
        </form>
    );
}

export default StudentRegisterForm;