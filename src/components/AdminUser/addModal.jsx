import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { getShelters } from "../../api/feedingRoutineApi";
import { createResourceManagment, editResourceManagment, getResourceById } from "../../api/resourceManagmentApi";
/* eslint-disable */
function AddModal({ handleIsOpen, isOpen, resourceId }) {
  const [data, setData] = useState({
    land_id: null,
    feed: null,
    labor: null,
  });

  const [shelters, setShelters] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const getResourceAgainstId = async () =>{
    try{
      const resp = await getResourceById(resourceId);
      setData({
        land_id: resp?.land_id?._id ,
        feed: resp?.feed ,
        labor: resp?.labor ,
      });
    }catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    if(resourceId){
      setIsEdit(true);
      initializeShelters();
      getResourceAgainstId();
    }else{
      setIsEdit(false);
      initializeShelters();
    }
  },[])

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
    data.user_id='66f40685940969f6344a0ede';
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
                <option value="" disabled>
                    Choose Land
                </option>
                {shelters?.map((sh) => (
                    <option key={`${sh?._id} + ${sh?.name}`} value={sh?._id}>{sh?.name}</option>
                ))}
              </Form.Select>
              <Form.Label className="mt-1">Feed</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={(e) => handleChange(e)}
                value={data.feed}
                name="feed"
              />
              <Form.Label className="mt-1">Labor</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={(e) => handleChange(e)}
                value={data.labor}
                name="labor"
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
