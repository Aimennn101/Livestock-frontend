import axios from 'axios';
import { getUserId } from '../service/roles';
const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
const token = localStorage.getItem('token');
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`, 
    },
  });

  export const createShelterSpace = async (shelter_space) => {
    try {
      const response = await api.post('/shelter-space/', shelter_space);
      return response.data;
    } catch (error) {
      console.error('Error creating feeding routine:', error);
      throw error;
    }
  };

  export const getShelterSpace = async () => {
    try {
      const response = await api.get(`/shelter-space/all-shelters/${getUserId()}`);
      return response.data;
    }  catch(error) {
      console.error("Error fetching shelters");
      throw error;
    }
  }
  
  export const getShelterSpaceById = async (id) => {
    try {
      const response = await api.get(`/shelter-space/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching feeding routines:', error);
      throw error;
    }
  };


  export const editShelterSpace = async (resourceId,shelterSpaceObj) => {
    try {
      const response = await api.put(`/shelter-space/${resourceId}`, shelterSpaceObj);
      return response.data;
    } catch (error) {
      console.error('Error editing feeding routine:', error);
      throw error;
    }
  };

  export const deleteShelterSpace = async (id) => {
    try {
      const response = await api.delete(`/shelter-space/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting shelter space:', error);
      throw error;
    }
  };