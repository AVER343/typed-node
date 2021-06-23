import axios from 'axios'
const API_BASE_ADDRESS = 'http://localhost:4200';
axios.defaults.withCredentials = true;
export default axios.create({
    baseURL:API_BASE_ADDRESS
})