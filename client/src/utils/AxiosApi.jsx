import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    timeout: 100000,
})

export { api };