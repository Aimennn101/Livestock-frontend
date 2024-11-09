import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { getShelters } from "../../api/feedingRoutineApi";
import { createResourceManagment, editResourceManagment, getResourceById } from "../../api/resourceManagmentApi";
import { getFeedingRoutines } from "../../api/feedingRoutineApi";
import { getUserId } from "../../service/roles";
/* eslint-disable */
function AddModal({ handleIsOpen, isOpen, resourceId }) {
  const [data, setData] = useState({
    land_id: null,
    feed_id: null,
    labor: null,
    animal_price:null
  });

  const [shelters, setShelters] = useState([]);
  const [feedingRoutine, setFeedingRoutine] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const getResourceAgainstId = async () =>{
    try{
      const resp = await getResourceById(resourceId);
      console.log(resp,"response against Id")
      setData({
        land_id: resp?.land_id?._id ,
        feed_id: resp?.feed_id?._id ,
        labor: resp?.labor,
        animal_price : resp?.animal_price
      });
    }catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    if(resourceId){
      setIsEdit(true);
      getFeedingRoutine();
      initializeShelters();
      getResourceAgainstId();
    }else{
      setIsEdit(false);
      initializeShelters();
      getFeedingRoutine();
    }
  },[])


  const getFeedingRoutine = async () => {
    try {
      const resp = await getFeedingRoutines();
      console.log(resp,"response")
      setFeedingRoutine(resp);
    } catch(error) {
      console.error(error);
      toast.error("Something went wrong !!");
    }
  }

  const initializeShelters = async () => {
    try {
      const resp = await getShelters();
      setShelters(resp);
    } catch(error) {
      console.error(error);
      toast.error("Something went wrong !!");
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitData = async () => {
    data.user_id= getUserId();
    try {
      if( isEdit && resourceId){
        const res = await editResourceManagment(resourceId, data);
        if(res){
          handleIsOpen();
          setIsEdit(false)
          toast.success("Data edit successfully!");
        
        }
      }
      else{
        const response = await createResourceManagment(data);
        if(response){
          handleIsOpen();
          toast.success("Resource Added Successfully !!");
        }
      }

    } catch (e) {
      console.error(e);
      toast.error("Something went wrong !!");
    }
  };

  return (
    <>
      <Modal
        show={isOpen}
        onHide={handleIsOpen}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add/Edit Resource</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="mt-1">Land</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => handleChange(e)}
                value={data.land_id}
                name="land_id"
              >
                <option value="" selected>
                    Choose Land
                </option>
                {shelters?.map((sh) => (
                    <option key={`${sh?._id} + ${sh?.name}`} value={sh?._id}>{sh?.name}</option>
                ))}
              </Form.Select>
              <Form.Label className="mt-1">Feed</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => handleChange(e)}
                value={data.feed_id}
                name="feed_id"
              >
                <option value="" selected>
                    Choose Feed
                </option>
                {feedingRoutine?.map((sh) => (
                    <option key={`${sh?._id} + ${sh?.feed_type}`} value={sh?._id}>{sh?.feed_type}</option>
                ))}
              </Form.Select>
              <Form.Label className="mt-1">Labor</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={(e) => handleChange(e)}
                value={data.labor}
                name="labor"
              />

              <Form.Label className="mt-1">Animal Price</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={(e) => handleChange(e)}
                value={data.animal_price}
                name="animal_price"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleIsOpen}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitData}>
            {isEdit ? "Edit Resource" : "Save Resource"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddModal;
