// App.js
import React, { useEffect, useState } from 'react';
import AppointmentCalendar from './appointmentCalender';
import { bookedTimeslots } from '../../api/doctorPortalApi';
import { formatTime } from '../../util/getFormatedDateAndTIme';

const DoctorDashboard = () => {
  // Sample appointment data
  const [appointments, setAppointments] = useState([]);

  useEffect(()=>{
    fetchedBookedTimeslots();
  }, [])

  const fetchedBookedTimeslots = async () => {
    try {
      const bookedTimeslot = await bookedTimeslots();  
      console.log(bookedTimeslot, "boooked")

      const formatTimeslot = (time) => {
        const date = new Date(time);
        // Format date as 'YYYY-MM-DD'
        const formattedDate = date.toISOString().split('T')[0]; // Extract date part
      
        return formattedDate;
      };
      
      // Apply the formatting to both start_time and end_time for each timeslot
      const updatedTimeslot = bookedTimeslot.data.map(slot => ({
        ...slot,
        formatted_start_time: {date: formatTimeslot(slot.start_time), time: formatTime(slot.start_time)},
        formatted_end_time: {date: formatTimeslot(slot.end_time), time: formatTime(slot.end_time)},
      }));

      setAppointments(updatedTimeslot)

    } catch(error) {
      console.error("Error")
    }
  }
  return (
    <div>
      <h4>Doctor Appointment Calendar</h4>
      <AppointmentCalendar appointments={appointments} />
    </div>
  );
};

export default DoctorDashboard;
