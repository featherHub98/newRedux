import axios from 'axios';
const token = localStorage.getItem('authToken') || '';
const axiosInstance = axios.create({    
    baseURL: '/api', 
    headers: {
        'Content-Type': 'application/json',
        'authorization' : `Bearer ${token}`,
    },
});



/*export const setAuthToken = (token: string | null) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
};*/

export default axiosInstance;