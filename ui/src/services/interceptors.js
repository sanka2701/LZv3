import axios from 'axios';

const apply = () => {
    axios.interceptors.request.use(
        config => {
            const jwtToken = localStorage.getItem('token');
            if (jwtToken) {
                config.headers.Authorization = `Bearer ${jwtToken}`;
            }
            return config;
        },
        error => Promise.reject(error)
    );
};

export default apply;



