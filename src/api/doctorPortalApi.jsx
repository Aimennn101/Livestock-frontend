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

export const createDoctorSlot = async (data) => {
    try {
        data["doctor_id"] = getUserId();
        const response = await api.post("/doctor", data);
        return response.data;
    }
    catch(error) {
        console.error("Error");
    }
}

export const getScheduledTimeslots = async () => {
  try {
    const response = await api.get(`/doctor/${getUserId()}`);
    return response.data;
  }
  catch(error) {
    console.error("Error");
  }
}

export const deleteDoctorSlot = async (id) => {
  try {
    const response = await api.delete(`/doctor/${id}`);
    return response.data;
  } catch(error) { 
    console.error("Error")
  }
}

export const getAllTimeslots = async () => {
  try {
    const repsonse = await api.get("/doctor");
    return repsonse.data;
  } catch(error) {
    console.error("Error")
  }
}

export const bookedTimeslots = async () => {
  try {
    const repsonse = await api.get(`/doctor/booked/${getUserId()}`);
    return repsonse.data;
  } catch(err) {
    console.error("Error");
  }
}

export const bookAppointment = async (timeslot_id, description, user_id) => {
  try {
    const response = await api.post('/doctor/book-appointment', {timeslot_id, description, user_id});
    return response.data;
  } catch(error) {
    console.error("Error");
  }
}

export const getBookedAppointmentsUser = async () => {
  try {
    const response = await api.get(`/doctor/user/${getUserId()}`);
    return response.data;
  }
  catch(error) {
    console.error("Error");
  }
}