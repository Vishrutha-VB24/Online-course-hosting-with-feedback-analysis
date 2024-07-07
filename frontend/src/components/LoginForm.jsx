import {  Tabs, TabsContent, TabsList, TabsTrigger, StudentLoginForm, InstructorLoginForm } from ".";

// eslint-disable-next-line react/prop-types
function LoginForm({className}) {
    return (
        <Tabs defaultValue="student" className={`${className}`}>
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
            </TabsList>
            <TabsContent value="student">
                <StudentLoginForm></StudentLoginForm>
            </TabsContent>
            <TabsContent value="instructor">
                <InstructorLoginForm></InstructorLoginForm>
            </TabsContent>
        </Tabs>
    );
}

export default LoginForm;