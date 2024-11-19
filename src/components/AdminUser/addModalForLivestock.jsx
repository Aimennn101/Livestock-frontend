import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { fetchLivestockAgainstId, createLivestock, editLivestock } from "../../api/livestockApi";

/* eslint-disable */
function AddModalForLivestock({ handleIsOpen, isOpen, livestockId }) {
    const [data, setData] = useState({
        type: null,
        breed: null,
        age: null,
        weight: null,
        price: null,
        quantity: null,
        rem_quantity: null
    });
    const [tempData, setTempData] = useState(data)
    const [isEdit, setIsEdit] = useState(false);


    const handleChange = async (e) => {
        // const { name, value } = e.target;
        
        // setData((prevData) => ({
        //     ...prevData,
        //     ...(name === "quantity" && { "rem_quantity": Math.abs(prevData["quantity"] - value) + prevData["rem_quantity"] }),
        //     [name]: value,
        // }));

        const { name, value } = e.target;
        console.log(e.target,"e")

        setData((prevData) => {
            // Calculate new quantity value
            const newQuantity = name === "quantity" ? parseFloat(value) : prevData["quantity"];
            const prevQuantity = tempData["quantity"]
            console.log(newQuantity,tempData["rem_quantity"],"quan")
            // If the name is "quantity", update rem_quantity; otherwise, keep it as is
            const newRemQuantity = name === "quantity" 
                ? Math.abs(parseInt(newQuantity)) - ((tempData["rem_quantity"] == 0 || tempData["rem_quantity"] ? parseInt(tempData["quantity"]) - parseInt(tempData["rem_quantity"]): 0))
                : parseInt(tempData["rem_quantity"]);
                console.log(newRemQuantity, "new")
            
            return {
                ...prevData,
                [name]: value, // Always update the current field
                rem_quantity: newRemQuantity // Update rem_quantity only when needed
            };
        });
    };

    const getLivestockAgainstId = async () => {
        try {
            const resp = await fetchLivestockAgainstId(livestockId);
            setData({
                type: resp?.type,
                breed: resp?.breed,
                age: resp?.age,
                weight: resp?.weight,
                price: resp?.price,
                quantity: resp?.quantity,
                rem_quantity: resp?.rem_quantity,
            });
            setTempData({
                type: resp?.type,
                breed: resp?.breed,
                age: resp?.age,
                weight: resp?.weight,
                price: resp?.price,
                quantity: resp?.quantity,
                rem_quantity: resp?.rem_quantity,
            });
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (livestockId) {
            setIsEdit(true);
            getLivestockAgainstId();
        } else {
            setIsEdit(false);

        }
    }, []);

    const handleSubmitData = async () => {
        try {
            if (isEdit) {
                const response = await editLivestock(livestockId, data);
                if (response) {
                    handleIsOpen();
                    setIsEdit(false)
                    toast.success("Data edit successfully!");
                }
            }
            else {
                const response = await createLivestock(data);
                if (response) {
                    handleIsOpen();
                    toast.success("Data saved successfully!");
                }
            }

        } catch (e) {
            console.log(e);
            toast.error("Something went wrong !!");
            setIsEdit(false)
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
                    <Modal.Title>Add/Edit Livestock</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

                            <Form.Label className="mt-1">Livestock Type</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                onChange={(e) => handleChange(e)}
                                value={data.type}
                                name="type"
                            />

                            <Form.Label className="mt-1">Breed</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                onChange={(e) => handleChange(e)}
                                value={data.breed}
                                name="breed"
                            />

                            <Form.Label className="mt-1">Age</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                onChange={(e) => handleChange(e)}
                                value={data.age}
                                name="age"
                            />

                            <Form.Label className="mt-1">Weight</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                onChange={(e) => handleChange(e)}
                                value={data.weight}
                                name="weight"
                            />

                            <Form.Label className="mt-1">Price</Form.Label>
                            <Form.Control
                                type="number"
                                autoFocus
                                onChange={(e) => handleChange(e)}
                                value={data.price}
                                name="price"
                            />

                            <Form.Label className="mt-1">Total Quantity</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                onChange={(e) => handleChange(e)}
                                value={data.quantity}
                                name="quantity"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleIsOpen}>
                        Close
                    </Button>
                    <Button variant="secondary" onClick={handleSubmitData}>
                        {isEdit ? "Edit Livestock" : "Save Livestock"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddModalForLivestock;
