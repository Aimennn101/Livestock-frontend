import axios from 'axios';
import { getUserId } from '../service/roles';

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const token = localStorage.getItem('token');
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': ` ${token}`, 
  },
});


export const getUserPurchases = async () => {
    try {
      const response = await api.get(`/user-purchase/${getUserId()}`);
      return response.data;
    }  catch(error) {
      console.error("Error fetching shelters");
      throw error;
    }
}

export const purchaseItem = async (shelter_id, quantity, cart_id) => {
    const purchase = {
        shelter_id: shelter_id,
        user_id: getUserId(),
        quant: quantity,
        cart_id: cart_id
    }
    try {
        const response = await api.post("/user-purchase", purchase);
        return response.data;
    } catch(error) {
        console.error("Error doing purchase");
        throw error;
    }
}

export const deletePurchasedItem = async (id) => {
    try {
        const response = await api.delete(`user-purchase/${id}`);
        return response.data;
    } catch(error) {
        console.log("Error deleting item")
        throw error;
    }
}