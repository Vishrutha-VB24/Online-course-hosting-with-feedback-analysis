import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Label, Textarea, Input } from ".";

function InstructorRegisterForm() {
    return (
        <form className="relative -top-14" action="">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Instructor Registration</CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-x-8 gap-y-3">
                    <div className="space-y-1">
                        <Label for="fullname">Fullname</Label>
                        <Input id="fullname" />
                    </div>
                    <div className="space-y-1">
                        <Label for="username">Username</Label>
                        <Input id="username" />
                    </div>
                    <div className="space-y-1">
                        <Label for="email">E-mail</Label>
                        <Input id="email" />
                    </div>
                    <div className="space-y-1">
                        <Label for="phone">Phone</Label>
                        <Input id="phone" />
                    </div>
                    <div className="space-y-1">
                        <Label for="password">Password</Label>
                        <Input id="password" />
                    </div>
                    <div className="space-y-1">
                        <Label for="c-password">Confirm Password</Label>
                        <Input id="c-password" />
                    </div>
                    <div className="space-y-1 col-span-2">
                        <Label for="bio">Bio</Label>
                        <Textarea id="bio" className="resize-none"></Textarea>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Register</Button>
                </CardFooter>
            </Card>
        </form>
    );
}

export default InstructorRegisterForm;