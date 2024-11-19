import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { getLiveStocks } from "../../api/feedingRoutineApi";
import { createShelterSpace, editShelterSpace, getShelterSpaceById } from "../../api/shelterSpaceApi";
import { getUserId } from "../../service/roles";

function AddShelterSpaceModal({ handleIsOpen, isOpen, resourceId }) {
  const [data, setData] = useState({
    livestock_id: null,
    shelter_type: null,
    available_shelter: null,
    ventilation: null,
    resting_area: null,
  });

  const [isEdit, setIsEdit] = useState(false);
  const [livestock, setLiveStock] = useState();

  const getResourceAgainstId = async () => {
    try {
      const resp = await getShelterSpaceById(resourceId);
      setData({
        livestock_id: resp?.livestock_id?._id,
        shelter_type: resp?.shelter_type,
        available_shelter: resp?.available_shelter,
        resting_area: resp?.resting_area,
      });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (resourceId) {
      setIsEdit(true);
      getLiveStocksList();
      getResourceAgainstId();
    } else {
      setIsEdit(false);
      getLiveStocksList()
    }
  }, [])


  const getLiveStocksList = async () => {
    try {
      const resp = await getLiveStocks();
      setLiveStock(resp);
    } catch (err) {
      console.error(err);
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
    data.user_id = getUserId();
    data.ventilation = 'Window';
    try {
      if (isEdit && resourceId) {
        const res = await editShelterSpace(resourceId, data);
        if (res) {
          handleIsOpen();
          setIsEdit(false)
          toast.success("Data edit successfully!");

        }
      }
      else {
        const response = await createShelterSpace(data);
        if (response) {
          handleIsOpen();
          toast.success("ShelterSpace Added Successfully !!");
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
          <Modal.Title>Add/Edit Shelter Space</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="mt-1">Animal Type</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => handleChange(e)}
                value={data.livestock_id} 
                name="livestock_id"
              >
                <option value="" selected>
                  Choose Type
                </option>
                {livestock?.map((liv) => (
                  <option key={`${liv?._id} + ${liv?.type}`} value={liv?._id}>
                    {liv?.type} - {liv?.breed}
                  </option>
                ))}

              </Form.Select>
           
              <Form.Label className="mt-1">Shlters Type</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => handleChange(e)}
                value={data.shelter_type}
                name="shelter_type"
              >
                <option value="" selected>
                  Choose Shelter
                </option>
                <option value="barn" >
                  Barn
                </option>
                <option value="shed" >
                  Shed
                </option>
              </Form.Select>
              <Form.Label className="mt-1">Avalilable Shelter Space (in meter)</Form.Label>
              <Form.Control
                type="number"
                autoFocus
                onChange={(e) => handleChange(e)}
                value={data.available_shelter}
                name="available_shelter"
              />
              <Form.Label className="mt-1">Ventilation</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={(e) => handleChange(e)}
                value='Window'
                disabled
                name="ventilation"
              />
              <Form.Label className="mt-1">Bedding/ Resting Areas</Form.Label>
              <Form.Control
                type="number"
                autoFocus
                onChange={(e) => handleChange(e)}
                value={data.resting_area}
                name="resting_area"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleIsOpen}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitData}>
            {isEdit ? "Edit Space" : "Save Space"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddShelterSpaceModal;
