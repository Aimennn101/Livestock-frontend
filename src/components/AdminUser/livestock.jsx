import { useEffect, useState } from "react";
import DashSidebar from "./dashSidebar";
import DashNavbar from "./dashNavbar";
import "../../../src/css/addButton.css";
import herhub from "../../assets/herhub2.png";
import AddModalForLivestock from "./addModalForLivestock";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import { getLiveStocks } from "../../api/feedingRoutineApi";
import { deleteLivestock } from "../../api/livestockApi";

const Livestock = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [livestockId, setLivestockId] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleIsOpen = (id = null) => {
    setLivestockId(id);
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    getLiveStocksList();
  }, [isOpen]);

  const getLiveStocksList = async () => {
    try {
      const resp = await getLiveStocks();
      console.log(resp, "res")
      setData(resp);
    } catch (err) {
      console.error(err);
    }
    finally {
        setLoading(false);
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item")) {
      try {
        const response = await deleteLivestock(id);
        if (response.deleted == 1) {
          toast.success(response.message);
          setData(data.filter(res => res._id !== id));
        } else {
          toast.error("Failed to delete item");
        }
      } catch (error) {
        console.error("Error deleting item:", error);
        toast.error("Error occurred while deleting item");
      }
    }
  };

  return (
    <div className="wrapper">
      <DashSidebar />
      <DashNavbar />

      {isOpen && (
        <AddModalForLivestock
          isOpen={isOpen}
          handleIsOpen={handleIsOpen}
          livestockId={livestockId}
        />
      )}

      <div className="main-panel mt-5">
        <div className="row align-content-center align-items-center justify-content-evenly">
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
              <div
                className="col-lg-4 col-md-6 pt-5 wow fadeInUp"
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
                        <b>Livestock Type:</b> {res?.type}
                      </p>
                      <p className="mb-1">
                        <b>Breed:</b> {res?.breed}
                      </p>
                      <p className="mb-1">
                        <b>Age:</b> {res?.age}
                      </p>
                      <p className="mb-1">
                        <b>Weight:</b> {res?.weight}
                      </p>
                      <p className="mb-1">
                        <b>Price:</b> {res?.price}
                      </p>
                      <p className="mb-1">
                        <b>Total Quantity:</b> {res?.quantity}
                      </p>
                      <p className="mb-1">
                        <b>Remaining Quantity:</b> {res?.rem_quantity}
                      </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                      <div className="col-icon">
                        <div
                          className="icon-primary"
                          style={{
                            marginRight: "50px",
                            marginTop: "40px",
                            cursor: "pointer"
                          }}
                          onClick={() => {
                            handleIsOpen(res?._id);
                          }}
                        >
                          <i className="fas fa-pen" style={{ color: "#EDDD5E" }}></i>
                        </div>
                      </div>
                      <div className="col-icon">
                        <div
                          className="icon-danger"
                          style={{
                            marginTop: "165px",
                            cursor: "pointer"
                          }}
                          onClick={() => handleDelete(res?._id)}
                        >
                          <i className="fas fa-trash" style={{ color: "#BE2B44" }}></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                height: "50vh",
                width: "50vw",
                textAlign: "center",
                alignContent: "center",
                fontSize: "20px",
              }}
            >
              No Resources to show. Please Add.
            </div>
          )}
        </div>

        <button
          className="floating-button"
          onClick={() => {
            handleIsOpen(null);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Livestock;
