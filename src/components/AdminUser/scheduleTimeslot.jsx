import { toast } from 'react-toastify'; // For notifications
import 'react-toastify/dist/ReactToastify.css'; // Toast styling
import React, { useEffect, useState } from "react";
import DashSidebar from "./dashSidebar";
import DashNavbar from "./dashNavbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../../css/datePicker.css";
import { createDoctorSlot } from '../../api/doctorPortalApi';
import { formatDay, formatTime } from "../../util/getFormatedDateAndTIme";
import { getScheduledTimeslots, deleteDoctorSlot } from '../../api/doctorPortalApi';
import "../../../src/css/reactTable.css";

const AvailableSlotForm = () => {
    const [data, setData] = useState(null);
    const [existingSlots, setExistingSlots] = useState([]);

    useEffect(() => {
        fetchExistingSlots();
    }, [])

    const fetchExistingSlots = async () => {
        try {
            const fetchedslots = await getScheduledTimeslots();
            setExistingSlots(fetchedslots.slots);
        } catch (error) {
            console.log(error);
        }
    }

    const getNext30MinInterval = (date) => {
        const newDate = new Date(date);
        const minutes = newDate.getMinutes();

        // If minutes are already at a 30-minute interval, return the same time
        if (minutes % 30 === 0) {
            return newDate;
        }

        // Calculate the next interval
        const nextInterval = Math.ceil(minutes / 30) * 30;

        // If nextInterval is 60, increment the hour and set minutes to 0
        if (nextInterval === 60) {
            newDate.setHours(newDate.getHours() + 1);
            newDate.setMinutes(0);
        } else {
            newDate.setMinutes(nextInterval);
        }

        return newDate;
    };


    const handleChange = (date, type) => {
        if (type === 'start_time') {
            // Reset end_time if start_time changes and add 30 minutes
            const newStartTime = getNext30MinInterval(date);
            console.log(newStartTime, "newStart")
            const newEndTime = new Date(newStartTime);
            newEndTime.setMinutes(newStartTime.getMinutes() + 30);

            console.log(new Date(date), "date")

            setData(prevData => ({
                ...prevData,
                start_time: newStartTime,
                end_time: newEndTime // Set the new end_time with 30 minutes added
            }));
        } else {
            setData(prevData => ({
                ...prevData,
                [type]: date
            }));
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await deleteDoctorSlot(id);
            if (response.deleted == 1) {
                setExistingSlots(existingSlots.filter(res => res._id != id));
                toast.success(response.message);
            }
            else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error("Error")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!data.start_time || !data.end_time || !data.fee) {
            toast.error('Please fill all fields.');
        }

        // Validate if end_time can't be lesser than start_time
        if (data.start_time > data.end_time) {
            toast.error('End time cannot be earlier than start time.');
            return; // Keep previous state, don't update
        }

        // Validate if start_time and end_time are on the same date
        if (data.start_time && data.end_time) {
            const startDate = new Date(data.start_time).toDateString();
            const endDate = new Date(data.end_time).toDateString();

            if (startDate !== endDate) {
                toast.error('Start time and End time must be on the same date.');
                return; // Keep previous state, don't update
            }
        }

        try {
            const slot = await createDoctorSlot(data);
            if (slot.inserted == 1) {
                setExistingSlots(prevSlots => [...prevSlots, slot.data]);
                toast.success(slot.message);
            }
            else {
                toast.error(slot.message);
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    return (
        <div className="wrapper">
            <DashSidebar></DashSidebar>
            <DashNavbar></DashNavbar>
            <div className="main-panel row justify-content-evenly">
                <div className="row col-4 align-content-center align-items-center justify-content-evenly">
                    <h2>Add Available Slot</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formDoctorTimeslot">
                            <div className="row col-12">
                                <div className="col-12 mr-5">
                                    <Form.Label className="mt-2 me-2 col-12">Start Time: </Form.Label>
                                    <DatePicker
                                        selected={data?.start_time ? new Date(data.start_time) : null}
                                        onChange={(date) => handleChange(date, 'start_time')}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={30}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        className="form-control-2 col-12"
                                        placeholderText="Select start time"
                                        required
                                        minDate={new Date()}  // Restrict to current and future dates
                                        minTime={new Date()}  // Restrict to current and future times
                                        maxTime={new Date(new Date().setHours(23, 59, 59, 999))}
                                        />
                                </div>
                            </div>
                            <div class="px-0 mx-0">
                            <Form.Label className="mt-3">Fee (Pkr)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter rate"
                                value={data?.rate}
                                onChange={(e) => handleChange(e.target.value, "fee")}
                                name="rate"
                                required
                                className="form-control-2"
                            />
                            </div>
                        </Form.Group>

                        <Button variant="primary" type="submit mt-1">
                            Add slot
                        </Button>
                    </Form>
                </div>
                <div className="table-wrapper">
                <div className="table-responsive col-12 table-container">
                    <table className="table align-items-center mb-0 custom-table">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Start Time</th>
                                <th scope="col">End Time</th>
                                <th scope="col">Fee</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {existingSlots && existingSlots.length > 0 ? (
                                existingSlots.map((res, index) => (
                                    <tr key={index}>
                                        <td>
                                            {formatDay(res?.start_time)}
                                        </td>
                                        <td>{formatTime(res?.start_time)}</td>
                                        <td>{formatTime(res?.end_time)}</td>
                                        <td>{res?.fee}</td>
                                        <td>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(res?._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No slots found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    );
};

export default AvailableSlotForm;
