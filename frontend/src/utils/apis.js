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
const logout = (role) => {
    return axios.get(`${apiRoute}/${role}/logout`);
}

const getAllCourse = () =>{
    return axios.get("http://localhost:8000/api/course/all");
    //should return an array of posts where each post contains tumbnail_url, title, descripton
}

const getCourse = (courseID) =>{
    return axios.get(`http://localhost:8000/api/course/${courseId}`);
}



export {

}