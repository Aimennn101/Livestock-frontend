import axios from 'axios';
const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
const token = localStorage.getItem('token');
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`, 
    },
  });

  export const createResourceManagment = async (resource_managment) => {
    try {
      const response = await api.post('/resource/add', resource_managment);
      return response.data;
    } catch (error) {
      console.error('Error creating feeding routine:', error);
      throw error;
    }
  };

export const getResourceById = async (id) => {
    try {
      const response = await api.get(`/resource/getResourceById/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching feeding routines:', error);
      throw error;
    }
  };

  export const editResourceManagment = async (resourceId,resourceObj) => {
    try {
      const response = await api.put(`/resource/${resourceId}`, resourceObj);
      return response.data;
    } catch (error) {
      console.error('Error editing feeding routine:', error);
      throw error;
    }
  };

  export const deleteResource = async (id) => {
    try {
      const response = await api.delete(`/resource/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting resource:', error);
      throw error;
    }
  };