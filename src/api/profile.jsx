import axios from 'axios';
import { getRole } from '../service/roles';
const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
const token = localStorage.getItem('token');
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`, 
    },
  });

  export const fetchUser = async (email, role) => {
    try {
        console.log(email, role, "email role")
        const response = await api.get(`/users/${email}/${role}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
      }
  } 

  export const updateUser = async (user) => {
    try {
        user["role"] = getRole();
        const response = await api.patch('/users/update', user);
        return response.data;
    } catch(error) {
        console.error("Error updating user", error);
        throw error;
    }
  }