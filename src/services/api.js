import axios from 'axios';

// Create an instance of Axios with a base URL
const api = axios.create({
    baseURL: 'https://fakestoreapi.com',
});

export default api;