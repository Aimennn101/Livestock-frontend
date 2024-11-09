import axios from 'axios';
import { getUser, getUserId } from '../service/roles';

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const token = localStorage.getItem('token');
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': ` ${token}`,
    },
});

export const addItemToCart = async (id) => {
    try {
        const payload = {
            item_id: id,
            user_id: getUserId()
        }
        const response = await api.post(`/cart`, payload);
        return response.data;
    } catch (error) {
        console.log("Error adding item to cart")
    }
}

export const fetchCartItems = async () => {
    try {
        const response = await api.get(`/cart/${getUserId()}`);
        return response.data.res;
    }
    catch (error) {
        console.log("Error fetching cart items")
    }
}

export const deleteCartItems = async (id) => {
    try {
      const response = await api.delete(`/cart/${id}`);
      return response.data;
    } catch(error) { 
      console.error("Error")
    }
  }