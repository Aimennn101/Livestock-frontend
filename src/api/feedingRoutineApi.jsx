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

export const getFeedingRoutines = async () => {
  try {
    const response = await api.get('/feeding-routines');
    return response.data;
  } catch (error) {
    console.error('Error fetching feeding routines:', error);
    throw error;
  }
};

export const getResources = async () => {
  const id = getUserId();
  try {
    const response = await api.get(`/resource/${id}`);
    return response.data;
  } catch(error) {
    console.error('Error fetching resources:', error);
    throw error;
  }
}

export const createFeedingRoutine = async (feedingRoutine) => {
  feedingRoutine["user_id"] = getUserId();
  try {
    const response = await api.post('/feeding-routines', feedingRoutine);
    return response.data;
  } catch (error) {
    console.error('Error creating feeding routine:', error);
    throw error;
  }
};

export const editFeedingRoutine = async (feedingRoutineId, feedingRoutine) => {
  feedingRoutine["user_id"] = getUserId();
  try {
    const response = await api.put(`/feeding-routines/${feedingRoutineId}`, feedingRoutine);
    return response.data;
  } catch (error) {
    console.error('Error editing feeding routine:', error);
    throw error;
  }
};

export const getLiveStocks = async () => {
  try {
    const response = await api.get('/livestock');
    return response.data;
  } catch (error) {
    console.error('Error fetching livestocks:', error);
    throw error;
  }
};

export const getFeedingRoutineAgainstId = async (id) => {
  try {
    const response = await api.get(`/feeding-routines/livestock/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching feeding routines:', error);
    throw error;
  }
};

export const getFeedingRoutineById = async (id) => {
  try {
    const response = await api.get(`/feeding-routines/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching feeding routines:', error);
    throw error;
  }
};

export const getShelters = async () => {
  try {
    const response = await api.get('/shelters');
    return response.data;
  }  catch(error) {
    console.error("Error fetching shelters");
    throw error;
  }
}

export const getAllUsers = async (role) => {
  try {
    const response = await api.get(`/users/${role}`);
    return role == 'user' ? response.data.usersWithBookingCount : response.data.users;
  } catch(error) {
    console.log("Error fetching all users");
  }
}

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response;
  } catch(error) {
    console.log("Error deleting a user")
  }
}

export const getAllUsersCount = async () => {
  try {
    const response = await api.get("/users/count");
    return response;
  } catch(error) {
    console.log("Error fetching all users count")
  }
}

export const deleteFeedingRoutine = async (id) => {
  try {
    const response = await api.delete(`/feeding-routines/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting feeding routine:', error);
    throw error;
  }
};