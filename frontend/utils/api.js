import axios from 'axios';

const API_BASE_URL = 'http://localhost:1337/api';

export const fetchDatafromSstrapi = async (endpoint) => {
    try {
        if(sessionStorage.getItem(endpoint)){
            // console.log(JSON.parse(sessionStorage.getItem(endpoint)));
            return JSON.parse(sessionStorage.getItem(endpoint));
        }else{
            const response = await axios.get(`${API_BASE_URL}/${endpoint}?populate=*`);
            sessionStorage.setItem(endpoint, JSON.stringify(response.data));
            return response.data;
        }
    } catch (error) {
        console.error("Error fetching data: " ,error);
        throw error;
    }
};

export const fetchAuthDataFromStrapi = async (endpoint, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching data: " ,error);
        throw error;
    }
};

export const registerNewUser = async (userData) => {
    try {
        const response = await fetch('http://localhost:1337/api/auth/local/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: userData.username,
                email: userData.email,
                password: userData.password
            })
        });
        const data = await response.json();
        sessionStorage.setItem('user', JSON.stringify(data.user));
    } catch(error){
        console.error('Error:', error);
    }
}

export const loginUser = async (userData) => {
    try {
        const response = await fetch('http://localhost:1337/api/auth/local', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                identifier: userData.email, 
                password: userData.password 
            }),
        });
        const data = await response.json();
        sessionStorage.setItem('user', JSON.stringify(data.user));
    } catch (error) {
        console.error('Error:', error);
    }
}