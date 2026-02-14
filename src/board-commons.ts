import axios, {AxiosInstance} from 'axios';

const boardClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3355',
    headers: {
        "Content-Type": "application/json"
    }
})

export default boardClient