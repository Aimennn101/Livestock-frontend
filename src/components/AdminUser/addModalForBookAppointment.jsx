import { useEffect, useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import { getAllTimeslots } from "../../api/doctorPortalApi";
import { formatDate, isSameDay } from "../../util/getFormatedDateAndTIme";
import { bookAppointment } from "../../api/doctorPortalApi";
import { getUserId } from "../../service/roles";
import { toast } from "react-toastify";

function ModalForBookingAppointment({ handleIsOpen, isOpen}) {
    const [slots, setSlots] = useState([]);
    const [start_time, setTime] = useState(null);
    const [doctor, setDoctor] = useState(null);
    const [description, setDescription] = useState(null);
    const [fee, setFee] = useState("");

    const didMountRef = useRef(false);

    useEffect(() => {
      if (didMountRef.current) {
        fetchTimeslots();
      } else {
        didMountRef.current = true;
      }
    }, []);

    const fetchTimeslots = async () => {
        try {
            const fetchedSlots = await getAllTimeslots();
            setSlots(fetchedSlots.data);
        } catch (e) {
            console.error(e);
        }
    }

    const handleChange = (data, field) => {
       if(field == "time") {
        setDescription(null);
        setFee("");
        setTime(data);
    }
       if(field == "description") setDescription(data);
    };

    const handleDocAndFeeChange = (data) => {
        const store = data.target.value?.split("-");
            setDoctor(store[0]); 
            setFee(store[1]);
    }

    const handleSubmit = async() => {
        try {
            const filtered = slots.filter(el => el.booked == 0 && formatDate(el.start_time) == formatDate(start_time) && el.doctor_id._id == doctor);
            const res = await bookAppointment(filtered[0]._id, description, getUserId());
            if(res.updated == 1) {
                toast.success(res.message);
                handleIsOpen();
            }
            else {
                toast.error(res.message);
            }
        } catch(error) {
            toast.error(error.message);
        }
    }

    return <>
        <Modal
            show={isOpen}
            onHide={handleIsOpen}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
            <Form id="test-form" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <div className="popup_box ">
                        <div className="popup_inner">
                            <h3>Make an Appointment</h3>
                                <div>
                                    <div className="col-12">
                                        <Form.Label className="mt-3 col-12">Select Date</Form.Label>
                                        <div></div>
                                        <DatePicker
                                            selected={start_time}
                                            onChange={(date) => handleChange(date, "time")}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            timeIntervals={30}
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                            className="form-control-2 col-12"
                                            placeholderText="Select start time"
                                            required
                                            minDate={new Date()}
                                            minTime={start_time && isSameDay(start_time, new Date()) ? new Date() : new Date().setHours(0, 0, 0, 0)}
                                            maxTime={new Date().setHours(23, 59)} 
                                        />
                                    </div>
                                    <div className="col-12">
                                        <Form.Label className="mt-3">Available Doctors</Form.Label>
                                        <Form.Select
                                            aria-label="Default select example"
                                            onChange={(e) => handleDocAndFeeChange(e)}
                                            name="doctor"
                                            >
                                            <option value="" selected>
                                                Choose Timeslot
                                            </option>
                                            {slots?.length > 0 && start_time &&
                                                slots
                                                ?.filter(sl => sl.booked === 0 && formatDate(sl.start_time) === formatDate(start_time))
                                                ?.map((sl) => (
                                                    <option key={sl?.doctor_id?._id} value={`${sl?.doctor_id?._id}-${sl?.fee}`}>
                                                    {sl?.doctor_id?.name} - Rs. {sl?.fee}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                    </div>

                                    <div className="col-12">
                                        <Form.Label className="mt-3">Description</Form.Label>
                                        <Form.Select
                                            aria-label="Default select example"
                                            onChange={(e) => handleChange(e.target.value, "description")}
                                            value={description}
                                            name="description"
                                        >
                                            <option value=""  selected> Choose Description </option>
                                            <option value="Check-up" > Check-up </option>
                                            <option value="Follow-up " > Follow-up </option>
                                            <option value="Consultation" > Consultation </option>
                                        </Form.Select>
                                    </div>
                                    
                                    <div className="col-12">
                                        <Form.Label className="mt-3">Fee (Pkr)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Fee"
                                            value={fee}
                                            name="fee"
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div class="mt-4 col-12" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <Button variant="primary" className="col-12" onClick={handleSubmit}>
                                    Confirm
                                </Button>
                                </div>
                        </div>
                    </div>
                </Form.Group>
            </Form>
        </Modal>
    </>

}

export default ModalForBookingAppointment;