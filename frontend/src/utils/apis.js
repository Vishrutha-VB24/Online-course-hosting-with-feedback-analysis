import axios from "axios"

const apiRoute = 'http://localhost:8000/api'

function login(data, role){
    return axios.post(`${apiRoute}/${role}/login`, data);
}
function register(data, role){
    return axios.post(`${apiRoute}/${role}/register`, data);
}

function getUser(role){
    return axios.get(`${apiRoute}/${role}/current`);
}
function logout(role){
    return axios.get(`${apiRoute}/${role}/logout`);
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
    return axios.get(`${apiRoute}/course/${courseID}`);
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


function getCourseProfile(courseID){
    return axios.get(`${apiRoute}/course/${id}/profile`)
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
}