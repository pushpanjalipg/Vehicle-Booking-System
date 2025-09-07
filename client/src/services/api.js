import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
// const apiUrl =import.meta.env.VITE_API_URL 
console.log("api",apiUrl);

const api = axios.create({
  baseURL: apiUrl, 
});

export default api;
