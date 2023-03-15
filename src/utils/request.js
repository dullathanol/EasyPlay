import axios from "axios";

const request = axios.create({
    timeout: 30000,
    withCredentials: true,
    baseURL: 'http://localhost:3000'
})

request.interceptors.request.use((config) => {
    if (localStorage.getItem('cookie') && config.params) {
        config.params.cookie = localStorage.getItem('cookie')
    }
    return config
}, (error) => {
    console.log(error);
})

request.interceptors.response.use((config) => {
    return config.data
}, (error) => {
    console.log(error);
})

export default request