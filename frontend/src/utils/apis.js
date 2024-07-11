import axios from "axios"

const apiRoute = '/api'
function login(data, role){
    return axios.post(`${apiRoute}/${role}/login`, data);
}
function register(data, role){
    return axios.post(`${apiRoute}/${role}/register`, data);
}

function getUser(){
    return axios.get(`${apiRoute}/user/current`, {withCredentials: true, withXSRFToken: true }, );
}
function logout(role){
    return axios.get(`${apiRoute}/${role}/logout`);
}

function instructorCourses(){
    return axios.get(`${apiRoute}/instructor/courses`)
}
function instructorCourseVideos(courseId){
    return axios.get(`${apiRoute}/instructor/course/allvideo/${courseId}`)
}

function getProfile(role){
    return axios.get(`${apiRoute}/${role}/profile`)
    // should return a student object if role is student 
    /*
        should return instructor object and all courses of instructor if instructor
    */
}

function getAllCourse(){
    return axios.get(`${apiRoute}/course/all`);
    //should return an array of posts where each post contains tumbnail_url, title, descripton
}

function getCourse(courseID){
    return axios.get(`${apiRoute}/course/get/${courseID}`);
    //should return a course object of reuested is and with variable indicating the user has register to that course
}

function courseRegistration(courseID){
    return axios.get(`${apiRoute}/course/register/${courseID}`);
}

function getAllCourseVideos(courseID){
    return axios.get(`${apiRoute}/course/${courseID}/videos`);
    //should return an array of video objects of the mentioned course if the user is registered to the course
}

function getCourseVideo(courseID, videoID){
    return axios.get(`${apiRoute}/course/${courseID}/video/${videoID}`)
    //should return a single video object of mentioned id if the user is registered to the course
}


function getCourseProfile(courseId){
    return axios.get(`${apiRoute}/course/${courseId}/profile`)
    // should return a course object with an array of all the videos under that course
}

function uploadVideo(courseID){
    return axios.post(`${apiRoute}/video/upload/${courseID}`)
    // should verify as instructor, check if the course belong to the instructor and then upload to cloudinary and create video object
}

function deleteVideo(videoID){
    return axios.delete(`${apiRoute}/video/delete/${videoID}`)
    //should verify as instrucor, check if the instructor is the owner of video and then  delete
}
function createCourse(data){
    return axios.post(`${apiRoute}/course/create`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

function getCourseInfo(courseID){
    return axios.get(`${apiRoute}/course/info/${courseID}`);
}

export {
    courseRegistration,
    deleteVideo,
    getAllCourse,
    getAllCourseVideos,
    getCourse,
    getCourseProfile,
    getCourseVideo,
    getProfile,
    getUser,
    login,
    logout,
    register,
    uploadVideo,
    createCourse,
    instructorCourseVideos,
    instructorCourses,
    getCourseInfo
}