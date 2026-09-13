import { axiosInstance } from "../../../app/config/axiosInstance"


export const registerUser = async (credentials) => {
    try {
        const response = await axiosInstance.post('/api/auth/register', credentials);
        return response.data;
    } catch (error) {
        console.log('Error form user Registration..', error.message)
    }
}

export const hydrateUser = async () => {

    try {
        const response = await axiosInstance.get('/api/auth/me');
        return response.data.user;
    } catch (error) {
        console.log("Error form acces Token ", error.message)
    }
}

export const loginUser = async (credentials) => {
    try {
        const res = await axiosInstance.post('/api/auth/login', credentials);

        return res.data
    } catch (error) {
        console.log('Error come from login api', error)
    }
}

export const logout = async () => {
    try {
        const res = await axiosInstance.get('/api/auth/logout');
        console.log(res);

        return res.data.user
    } catch (error) {
        console.log('Error come from logout api ', error)
    }
}