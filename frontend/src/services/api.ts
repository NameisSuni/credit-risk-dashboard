import axios from "axios";
const BASE_URL = import.meta.env.VITE_CREDIT_RISK_BACKEND_URL;

const _axios = axios.create({
  baseURL: BASE_URL,
  validateStatus: (status) => status < 500,
});

_axios.interceptors.response.use(
  function (response) {
    if (response.status === 401 || response.status === 403) {
      localStorage.clear();
    }
    return response;
  },
  function (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export default _axios;
