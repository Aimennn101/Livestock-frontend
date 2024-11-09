import React from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBIcon,
    MDBRipple,
    MDBBtn,
} from "mdb-react-ui-kit";
import DashNavbar from "./dashNavbar";
import { useState, useEffect } from "react";
import { getShelterSpace } from "../../api/shelterSpaceApi";
import { Oval } from "react-loader-spinner";
import goat from "../../assets/goat-card.jpg";
import sheep from "../../assets/sheep.jpg"
import cow from "../../assets/cow-card.jpg"
import { addItemToCart } from "../../api/listingPage";
import { toast } from "react-toastify";

function listingPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSelterSpace();
    }, []);

    const addEntytoCart = async (id) => {
        try {
            const resp = await addItemToCart(id);
            if(resp.created == 1) toast.success(resp.message);
            else toast.error(resp.message)
        } catch (err) {
            console.error(err);
            toast.error("Failed to add item to cart");
        }
    }

    const fetchSelterSpace = async () => {
        try {
            const shelterSpace = await getShelterSpace();
            setData(shelterSpace)
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <> <DashNavbar />
            <MDBContainer fluid>
                <MDBRow className="justify-content-center mb-0">
                    <MDBCol md="12" xl="10">
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
                            data?.map((res) => (
                                <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3" key = {res._id}>
                                    <MDBCardBody>
                                        <MDBRow>
                                            <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                                                <MDBRipple
                                                    rippleColor="light"
                                                    rippleTag="div"
                                                    className="bg-image rounded hover-zoom hover-overlay"
                                                >
                                                    <MDBCardImage
                                                        src={res?.livestock_id?.type == "Goat" ? goat : (res?.livestock_id?.type == "Sheep" ? sheep : cow)}
                                                        fluid
                                                        className="w-100"
                                                    />
                                                    <a href="#!">
                                                        <div
                                                            className="mask"
                                                            style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                                                        ></div>
                                                    </a>
                                                </MDBRipple>
                                            </MDBCol>
                                            <MDBCol md="6" className="pt-5">
                                                <h5>{res?.livestock_id?.type}</h5>
                                                <div className="d-flex flex-row">
                                                    <span className="text-muted ">Available Quantity: <b>{res?.livestock_id?.rem_quantity}</b></span>
                                                </div>
                                                <div className="mt-1 mb-1 text-muted medium">
                                                    <span>Size: <b>{res?.size_in_kg} in kg/lb</b></span>
                                                    <span className="text-primary mx-1"> • </span>
                                                    <span>Ventilation: <b>{res?.ventilation}</b>
                                                        <br /></span>
                                                </div>
                                                <div className="mb-2 text-muted">
                                                    <span>
                                                        Shelter Type: <b>{res?.shelter_type}</b>
                                                    </span>
                                                    <span className="text-primary mx-1"> • </span>
                                                    <span>Resting Area: <b>{res?.resting_area}</b></span>
                                                </div>
                                                <b className="text-truncate mb-4 mb-md-0 small" style={{ color: "red" }}>
                                                    Please read all details before purchasing.
                                                </b>
                                            </MDBCol>
                                            <MDBCol
                                                md="6"
                                                lg="3"
                                                className="border-sm-start-none border-start"
                                            >
                                                <div className="d-flex flex-row align-items-center justify-content-center mb-1 mt-5">
                                                    <h4 className="mb-1 me-1">Rs. {res?.livestock_id?.price} </h4>
                                                    {/* <span className="text-danger">
                                                        <s>Rs. 20.99</s>
                                                    </span> */}
                                                </div>
                                                <div className="d-flex flex-row align-items-center justify-content-center"><h6 className="text-success">Free shipping</h6></div>
                                                <div className="d-flex flex-column mt-1">
                                                    <button className="btn btn-outline-primary mt-2" onClick={() => addEntytoCart(res?._id)}>
                                                        Add to cart
                                                    </button>
                                                </div>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCardBody>
                                </MDBCard>
                            ))) : ""}
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    );
}

export default listingPage;