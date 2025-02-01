import axios from "axios";

export  const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "vahidp" ? "http://localhost:5001/api" : "/api",
    withCredentials: true,
    
})

