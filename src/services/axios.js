import axios from "axios";
//http://192.168.1.134:3001
//const url=process.env.VUE_APP_RUTA_API;
const axiosInstance = axios.create({

    baseURL:process.env.VUE_APP_RUTA_API, //`${url}`,
    headers: {
        'Content-Type': 'application/json',

    },

});

export default axiosInstance;