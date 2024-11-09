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

export const fetchLivestockAgainstId = async (id) => {
    try {
        const response = await api.get(`/livestock/${id}`,);
        return response.data;
    } catch (error) {
        console.log("Error adding item to cart")
    }
}

export const createLivestock = async (livestock) => {
    livestock["owner_id"] = getUserId();
    try {
      const response = await api.post('/livestock', livestock);
      return response.data;
    } catch (error) {
      console.error('Error creating feeding routine:', error);
      throw error;
    }
  };
  
  export const editLivestock = async (livestockId, livestock) => {
    livestock["owner_id"] = getUserId();
    try {
      const response = await api.put(`/livestock/${livestockId}`, livestock);
      return response.data;
    } catch (error) {
      console.error('Error editing feeding routine:', error);
      throw error;
    }
  };

  export const deleteLivestock = async (id) => {
    try {
      const response = await api.delete(`/livestock/${id}`);
      return response.data;
    } catch(error) {
      console.log("Error deleting livestock")
    }
  }