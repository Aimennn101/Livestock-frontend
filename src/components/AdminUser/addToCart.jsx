import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBListGroup,
    MDBListGroupItem,
    MDBRipple,
    MDBRow,
    MDBTooltip,
    MDBTypography,
} from "mdb-react-ui-kit";
import React from "react";
import DashNavbar from "./dashNavbar";
import { fetchCartItems, deleteCartItems } from "../../api/listingPage";
import { useEffect, useState, useRef } from "react";
import { Oval } from "react-loader-spinner";
import goat from "../../assets/goat-card.jpg";
import sheep from "../../assets/sheep.jpg"
import cow from "../../assets/cow-card.jpg"
import { toast } from "react-toastify";
import { formatDay } from "../../util/getFormatedDateAndTIme";
import { addDays } from "date-fns";
import { purchaseItem } from "../../api/userDashboardApi";
import { useNavigate } from "react-router-dom";


export default function Cart() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalAmnt, setAmnt] = useState(0);
    const fetchedRef = useRef(false);
    const total = useRef(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (!fetchedRef.current) {
            fetchCartItem();
            fetchedRef.current = true;
        }
    }, []);

    const fetchCartItem = async () => {
        try {
            const cartItems = await fetchCartItems();

            setData(cartItems.map(item => ({
                ...item,
                quantity: 1
            })));
            total.current = cartItems.reduce((acc, res) => {
                return acc + parseInt(res.shelterspace_id.livestock_id.price || 0);
            }, 0);

            setAmnt(total.current)

        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    const updateTotal = (id, value, quantity, type) => {
        const index = data.findIndex(res => res._id === id);
        if (type == "minus") {
            if(parseInt(document.getElementById("quantityInput" + id).value) > 0) {
            document.getElementById("quantityInput" + id).stepDown();
            data[index]["quantity"] = document.getElementById("quantityInput" + id).value;
            total.current -= value;
            setAmnt(total.current);
            }
        }
        else if (type == "input") {
            if((parseInt(document.getElementById("quantityInput" + id).value) > 0 ) && (parseInt(document.getElementById("quantityInput" + id).value)) <= quantity) {
            data[index]["quantity"] = document.getElementById("quantityInput" + id).value;
            total.current = parseInt(data[index]["quantity"]) * parseInt(value);
            setAmnt(total.current);
            }
            else {
                toast.warn("Count is not within the range")
            }
        }
        else {
            if(quantity > parseInt(document.getElementById("quantityInput" + id).value)) {
            document.getElementById("quantityInput" + id).stepUp();
            data[index]["quantity"] = document.getElementById("quantityInput" + id).value;
            total.current += value;
            setAmnt(total.current);
            }
        }
    }

    const handlePurchase = async () => {
        const purchasePromises = data.map((res) =>
            purchaseItem(res?.shelterspace_id?._id, res?.quantity, res?._id, res?.shelterspace_id?.livestock_id?._id)
        );

        try {
            const purchasedItems = await Promise.all(purchasePromises);
            if(purchasedItems[purchasedItems?.length - 1].purchased == 1) {
                toast.success("Thank you doing a purchase on our platform");
                navigate("/orders");
            }
        } catch (error) {
            console.error("Error purchasing items:", error);
        }
    }

    const handleDelete = async (itemId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const response = await deleteCartItems(itemId);
                if (response.deleted === 1) {
                    total.current -= (parseInt(data.find(res => res._id === itemId)?.shelterspace_id?.livestock_id?.price) * parseInt(document.getElementById("quantityInput" + itemId)?.value));
                    setAmnt(total.current)
                    toast.success("Item removed from cart");
                    setData(data.filter(dt => dt._id !== itemId));

                } else {
                    toast.error("Failed to remove item");
                }
            } catch (error) {
                console.error("Error removing item:", error);
                toast.error("Error occurred while removing item");
            }
        }
    };

    return (
        <section className="h-100 gradient-custom">
            <DashNavbar />
            {loading ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "50vh",
                    }}
                >
                    <Oval
                        height={60}
                        width={190}
                        color="#5B8C51"
                        ariaLabel="oval-loading"
                        secondaryColor="#EDDD5E"
                        strokeWidth={6}
                        strokeWidthSecondary={6}
                    />
                </div>
            ) : data && data.length > 0 ? (
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center my-4">
                        <MDBCol md="8">
                            <MDBCard className="mb-4">
                                {data?.length > 0 &&
                                    <MDBCardHeader className="py-3">
                                        <MDBTypography tag="h5" className="mb-0">
                                            Cart - {data?.length}
                                        </MDBTypography>
                                    </MDBCardHeader>}
                                <MDBCardBody>
                                    {data?.length > 0 ? (
                                        data?.map((res) => (
                                            <MDBRow className="mb-4">
                                                <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                                                    <MDBRipple rippleTag="div" rippleColor="light"
                                                        className="bg-image rounded hover-zoom hover-overlay">
                                                        <img
                                                            src={res?.shelterspace_id?.livestock_id?.type == "Goat" ? goat : (res?.shelterspace_id?.livestock_id?.type == "Sheep" ? sheep : cow)}
                                                            fluid
                                                            className="w-100"
                                                        />
                                                        <a href="#!">
                                                            <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)", }}>
                                                            </div>
                                                        </a>
                                                    </MDBRipple>
                                                </MDBCol>

                                                <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                                                    <p>
                                                        <strong>{res?.shelterspace_id?.livestock_id?.type}</strong>
                                                    </p>

                                                    <div className=" mb-1 text-muted medium">
                                                        <span>Breed: <b>{res?.shelterspace_id?.livestock_id?.breed}</b></span>
                                                        <span className="text-primary mx-1"> • </span>
                                                        <span>Age: <b>{res?.shelterspace_id?.livestock_id?.age}</b>
                                                            <br /></span>
                                                    </div>
                                                    <div className="mt-1 mb-1 text-muted medium">
                                                        <span>Weight: <b>{res?.shelterspace_id?.livestock_id?.weight} kg</b></span>
                                                        <span className="text-primary mx-1"> • </span>
                                                        <span>Ventilation: <b>{res?.shelterspace_id?.ventilation}</b>
                                                            <br /></span>
                                                    </div>
                                                    <div className="mb-2 text-muted">
                                                        <span>
                                                            Shelter Type: <b>{res?.shelterspace_id?.shelter_type}</b>
                                                        </span>
                                                        <span className="text-primary mx-1"> • </span>
                                                        <span>Resting Area: <b>{res?.shelterspace_id?.resting_area}</b></span>
                                                    </div>


                                                    <button className="btn btn-primary"
                                                        title="Remove item" onClick={() => handleDelete(res._id)}>
                                                        <MDBIcon fas icon="trash" />
                                                    </button>

                                                </MDBCol>
                                                <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                                                    <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                                                        <button className=" btn btn-primary px-3 me-2" onClick={() => updateTotal(res._id, res?.shelterspace_id?.livestock_id?.price, res?.shelterspace_id?.livestock_id?.rem_quantity, "minus")}
                                                        >
                                                            <MDBIcon fas icon="minus" />
                                                        </button>

                                                        <MDBInput id={"quantityInput" + res?._id} defaultValue={1} min={0} max={res?.shelterspace_id?.rem_quantity}
                                                            type="number" label={"Available Quantity: " + res?.shelterspace_id?.livestock_id?.rem_quantity} onKeyUp={()=> updateTotal(res._id, res?.shelterspace_id?.livestock_id?.price, res?.shelterspace_id?.livestock_id?.rem_quantity, "input")}/>
                                                        <button className="btn btn-primary px-3 ms-2" onClick={() => updateTotal(res._id, res?.shelterspace_id?.livestock_id?.price, res?.shelterspace_id?.livestock_id?.rem_quantity, "plus")}>
                                                            <MDBIcon fas icon="plus" />
                                                        </button>
                                                    </div>

                                                    <p className="text-start text-md-center">
                                                        <strong>Rs. {res?.shelterspace_id?.livestock_id?.price}</strong>
                                                    </p>
                                                </MDBCol>
                                            </MDBRow>
                                        ))) : "No data"
                                    }
                                </MDBCardBody>
                            </MDBCard>

                            <MDBCard className="mb-4">
                                <MDBCardBody>
                                    <p>
                                        <strong>Expected shipping delivery</strong>
                                    </p>
                                    <p className="mb-0">{formatDay(new Date())} - {formatDay(addDays(new Date(), 7))}</p>
                                </MDBCardBody>
                            </MDBCard>

                            <MDBCard className="mb-4 mb-lg-0">
                                <MDBCardBody>
                                    <p>
                                        <strong>We accept</strong>
                                    </p>
                                    <p> Cash On Delivery (COD)</p>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol md="4">
                            <MDBCard className="mb-4">
                                <MDBCardHeader>
                                    <MDBTypography tag="h5" className="mb-0">
                                        Summary
                                    </MDBTypography>
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <MDBListGroup flush>
                                        <MDBListGroupItem
                                            className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                            Products
                                            <span>Rs. {totalAmnt}</span>
                                        </MDBListGroupItem>
                                        <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                                            Shipping
                                            <span>Default Profile Address</span>
                                        </MDBListGroupItem>
                                        <MDBListGroupItem
                                            className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                            <div>
                                                <strong>Total amount</strong>
                                                <strong>
                                                    <p className="mb-0">(including Tax)</p>
                                                </strong>
                                            </div>
                                            <span>
                                                <strong>Rs. {totalAmnt}</strong>
                                            </span>
                                        </MDBListGroupItem>
                                    </MDBListGroup>

                                    <button className="btn btn-primary" onClick={handlePurchase}>
                                        Checkout
                                    </button>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            ) :
                (
                    <div
                        style={{
                            height: "100vh",
                            width: "100vw",
                            textAlign: "center",
                            alignContent: "center",
                            fontSize: "20px",
                        }}
                    >
                        Cart is empty
                    </div>
                )}
        </section>
    );
}