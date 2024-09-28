import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import {
  createFeedingRoutine,
  editFeedingRoutine,
  getFeedingRoutineAgainstId,
  getFeedingRoutineById,
  getLiveStocks,
} from "../../api/feedingRoutineApi";
import { formatDate } from "../../util/getFormatedDateAndTIme";
import { toast } from "react-toastify";

function AddModalForFeedingRoutine({ handleIsOPen, isOpen, feedingRoutineId }) {
  const [data, setData] = useState({
    livestock_id: null,
    feeding_time: null,
    feed_type: null,
    quantity: null,
  });
  const [singleFeedingRoutine, setSingleFeedingRoutine] = useState([]);
  const [livestock, setLiveStock] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const getFeedRoutine = async( value) =>{
    setSingleFeedingRoutine([])
    try {
      const resp = await getFeedingRoutineAgainstId(value);
      setSingleFeedingRoutine(resp);
    } catch (err) {
      console.error(err);
    }
  }
  const handleChange = async (e) => {
    const { name, value } = e.target;
    console.log(name, value, "value");
    if (name === "livestock_id") {
      setSingleFeedingRoutine([])
      getFeedRoutine(value)
    }
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getFeedingRoutineByIds = async () =>{
    try{
      const resp = await getFeedingRoutineById(feedingRoutineId);
      await getFeedRoutine(resp?.livestock_id?._id)
      setData({
        livestock_id: resp?.livestock_id?._id ,
        feeding_time: resp?.feeding_time,
        feed_type: resp?.feed_type ,
        quantity: resp?.quantity ,
      });
    }catch(err){
      console.error(err);
    }
  }
  useEffect(() => {
    if(feedingRoutineId){
      setIsEdit(true);
      getLiveStock();
      getFeedingRoutineByIds();
    }else{
      setIsEdit(false);
      getLiveStock();
  
    }
   
  }, []);

  const getLiveStock = async () => {
    try {
      const resp = await getLiveStocks();
      setLiveStock(resp);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitData = async () => {
    data.user_id="66ec27489e7fcfc83dc16656"
    try {
      if(isEdit){
        const response = await editFeedingRoutine(feedingRoutineId, data);
        if(response){
          handleIsOPen();
          setIsEdit(false)
          toast.success("Data edit successfully!");
        
        }
      }
      else{
        const response = await createFeedingRoutine(data);
        if(response){
          handleIsOPen();
          toast.success("Data saved successfully!");
        
        }
      }

    } catch (e) {
      console.log(e);
      toast.error("SOmething went wrong !!");
      setIsEdit(false)
    }
  };

  return (
    <>
      <Modal
        show={isOpen}
        onHide={handleIsOPen}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add/Edit Feeding Routines</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Live Stock</Form.Label>


                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => handleChange(e)}
                  value={data.livestock_id}
                  name="livestock_id"
                >
                  <option value=""  selected> 
                    Choose Live Stock
                  </option>
                  {livestock?.map((liv) => (
                    <option key={`${liv?._id} + ${liv?.type}`} value={liv?._id}>
                      {liv?.type}
                    </option>
                  ))}
                </Form.Select>
             

                
                  <Form.Label className="mt-1">Feeding Routine</Form.Label>

                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => handleChange(e)}
                    value={data.feeding_time}
                    name="feeding_time"
                  >
                    <option value="" selected>
                      Choose Feeding Routine
                    </option>
                    {singleFeedingRoutine?.map((feeding) => (
                      <option
                        key={`${feeding?._id} - ${feeding?.feeding_time}`}
                        value={feeding?.feeding_time}
                      >
                        {formatDate(feeding?.feeding_time)}
                      </option>
                    ))}
                  </Form.Select>
  
              <Form.Label className="mt-1">Feed Type</Form.Label>
                <Form.Control
                type="text"
                autoFocus
                onChange={(e) => handleChange(e)}
                value={data.feed_type}
                name="feed_type"
              />

              <Form.Label className="mt-1">Feed Amount</Form.Label>
              <Form.Control
                type="number"
                autoFocus
                onChange={(e) => handleChange(e)}
                value={data.quantity}
                name="quantity"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleIsOPen}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitData}>
            {isEdit ? "Edit Routine" : "Save Routine"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddModalForFeedingRoutine;
