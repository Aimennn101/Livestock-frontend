import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { getShelterSpace } from "../../api/shelterSpaceApi";
import { purchaseItem } from "../../api/userDashboardApi";

function PurchaseItemsModal({ handleIsOpen, isOpen, resourceId }) {
    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        fetchSelterSpace();
    }, [])

    const fetchSelterSpace = async () => {
        try {
            const shelterSpace = await getShelterSpace();
            setAnimals(shelterSpace)
        } catch (e) {
            console.error(e);
        }
    }

    const handlePurchase = async (shelter_id) => {
        try {
            const purchased = await purchaseItem(shelter_id);
            if (purchased?.purchased == 1) {
                toast(purchased?.message);
                setAnimals(prevAnimals => 
                    prevAnimals.map(animal => 
                        animal._id === shelter_id
                            ? { ...animal, purchased: 1 }
                            : animal
                    )
                );
                handleIsOpen();
            }
            else {
                toast(purchased?.message || "Error buying item"); 
            }
        } catch(error) {
            toast(error.message || "Error buying item")
            console.error(error);
        }
    }

    return <>
        <Modal
            show={isOpen}
            onHide={handleIsOpen}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className="table-responsive">
                <table className="table align-items-center mb-0">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">LiveStock</th>
                            <th scope="col">Size in kg/lb</th>
                            <th scope="col">Ventilation</th>
                            <th scope="col">Animal Quantity</th>
                            <th scope="col">Available Shelter</th>
                            <th scope="col">Shelter Type</th>
                            <th scope="col">Resting Area</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {animals && animals.length > 0 ? (
                            animals.map((res, index) => (
                                <tr key={index}>
                                    <th scope="row">
                                        {res?.livestock_id?.type}
                                    </th>
                                    <td>{res?.ventilation}</td>
                                    <td>{res?.available_shelter}</td>
                                    <td>{res?.shelter_type}</td>
                                    <td>{res?.resting_area}</td>
                                    <td>
                                    <button
                                        className={`btn btn-sm ${res?.purchased === 1 ? 'btn-danger' : 'btn-success'}`}
                                        onClick={() => handlePurchase(res._id)}
                                        disabled={res?.purchased === 1}
                                    >
                                        {res?.purchased === 1 ? "Purchased" : "Purchase"}
                                    </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No animals found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Modal>
    </>
}

export default PurchaseItemsModal;