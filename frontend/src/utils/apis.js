import axios from "axios"

const apiRoute = 'http://localhost:8000/api'

function login(data, role){
    return axios.post(`${apiRoute}/${role}/login`);
}
function register(data, role){
    return axios.post(`${apiRoute}/${role}/register`);
}

function getUser(role){
    return axios.get(`${apiRoute}/${role}/current`);
}
function logout(role){
    return axios.get(`${apiRoute}/${role}/logout`);
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


export {

}