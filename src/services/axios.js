import axios from "axios";

//const url=process.env.VUE_APP_RUTA_API;
const axiosInstance = axios.create({

    baseURL: `http://192.168.1.134:3001`,
    headers: {
        'Content-Type': 'application/json',

    },

});

export default axiosInstance;