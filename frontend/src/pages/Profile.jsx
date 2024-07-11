import { InstructorProfile } from "@/components";
import StudentProfile from "@/components/StudentProfile";
import { useSelector } from "react-redux";

function Profile() {
    const user = useSelector(state => state.auth.role)
    return (
        <>
            {
                user == 'student' && <StudentProfile/> 
            }
            {
                user == 'instructor' && <InstructorProfile/>
            }
        </>
    );
}

export default Profile;