// AppointmentCalendar.js
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../css/calendar.css'
import { formatDay, formatTime, formatDate } from '../../util/getFormatedDateAndTIme';

// Set up the localizer by providing the moment Object to the correct localizer.
const localizer = momentLocalizer(moment);

const AppointmentCalendar = ({ appointments }) => {
  console.log(appointments, "appointment")
  const events = appointments.map((appointment) => ({
    id: appointment._id,
    title: appointment.description,
    start: new Date(appointment.formatted_start_time.date + ' ' + appointment.formatted_start_time.time),
    end: new Date(appointment.formatted_end_time.date + ' ' + appointment.formatted_end_time.time),
  }));

  return (
    <div style={{ height: 600 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%', margin: '45px 2px' }}
        selectable
      />
    </div>
  );
};

export default AppointmentCalendar;
