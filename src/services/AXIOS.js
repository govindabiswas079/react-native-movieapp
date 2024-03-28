import axios from 'axios';

export const AXIOS = () => {
    const API = axios.create({
        baseURL: "https://api.themoviedb.org/3",
    });

    API.interceptors.request.use(async function (config) {
        const controller = new AbortController();

        try {
            config.headers.Authorization = `Bearer key here`;
            config.headers.Accept = 'application/json, text/plain, */*';

            return {
                ...config,
                signal: controller.signal
            };
        } catch (error) {
            return Promise.reject(error);
        }
    })

    API.interceptors.response.use(function (response) {

        return { data: response?.data, status: response?.status };
    }, function (error) {
        if (error?.response?.status === 401) {

        } else if (error?.message === "Network Error") {

        } else if (error?.response?.status === 400) {

        } else if (error?.response?.status === 403) {

        } else if (error?.response?.status === 404) {

        } else if (error?.response?.status === 405) {

        }

        return Promise.reject(error);
    })

    return API;
};