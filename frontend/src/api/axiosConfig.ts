import axios from "axios";

const LOCAL_API_BASE_URL = "http://localhost:5000/api";

const apiBaseURL = import.meta.env.DEV
  ? import.meta.env.VITE_DEV_API_BASE_URL ?? LOCAL_API_BASE_URL
  : import.meta.env.VITE_API_BASE_URL;

axios.defaults.baseURL = apiBaseURL;

export default axios;
