import { useEffect, useState } from "react";
import DashNavbar from "./dashNavbar";
import { Oval } from "react-loader-spinner";
import herhub from "../../assets/herhub2.png";
import { getUserPurchases } from "../../api/userDashboardApi";

function PurchasedItems() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserPurchases();
    }, [])

    const fetchUserPurchases = async () => {
        try {
            const userPurchasedItems = await getUserPurchases();
            console.log(userPurchasedItems, "asd")
            setData(userPurchasedItems?.animal)
        } catch (e) {
            console.error(e);
        }
        finally {
            setLoading(false);
        }
    }

    return <>
        <div className="wrapper">
            <DashNavbar />
            <div className="mt-5">
                <div className="row align-content-center align-items-center justify-content-evenly">
                    {loading ? (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "80vh",
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
                            <div
                                className="col-lg-3 col-md-4 pt-5 wow fadeInUp"
                                data-wow-delay="0.5s"
                                key={res._id}
                            >
                                <div className="service-item d-flex h-100">
                                    <div className="service-img">
                                        <img className="img-fluid" src={herhub} alt="" />
                                    </div>
                                    <div style={{ display: "flex", flexGrow: 2, justifyContent: "space-between", alignItems: "flex-start" }}>
                                        <div className="service-text p-5 pt-0">
                                            <p className="mb-1 mt-5">
                                                <b>Livestock:</b> {res?.shelterspace_id?.livestock_id?.type}
                                            </p>
                                            <p className="mb-1">
                                                <b>Breed:</b> {res?.shelterspace_id?.livestock_id?.breed}
                                            </p>
                                            <p className="mb-1">
                                                <b>Weight:</b> {res?.shelterspace_id?.livestock_id?.weight}
                                            </p>
                                            <p className="mb-1">
                                                <b>Ventilation:</b> {res?.shelterspace_id?.ventilation}
                                            </p>
                                            <p className="mb-1">
                                                <b>Available Shelter:</b> {res?.shelterspace_id?.available_shelter}
                                            </p>
                                            <p className="mb-1">
                                                <b>Shelter Type:</b> {res?.shelterspace_id?.shelter_type}
                                            </p>
                                            <p className="mb-1">
                                                <b>Resting Area:</b> {res?.shelterspace_id?.resting_area}
                                            </p>
                                            <p className="mb-1">
                                                <b>Price:</b> {res?.shelterspace_id?.livestock_id?.price}
                                            </p>
                                            <p className="mb-1">
                                                <b>Quantity:</b> {res?.bought_quantity}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div
                            style={{
                                height: "80vh",
                                width: "50vw",
                                textAlign: "center",
                                alignContent: "center",
                                fontSize: "20px",
                            }}
                        >
                            No purchases made
                        </div>
                    )}
                </div>
            </div>
        </div>
    </>
}

export default PurchasedItems;