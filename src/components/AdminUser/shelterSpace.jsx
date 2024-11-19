import { useEffect, useState } from "react";
import DashSidebar from "./dashSidebar";
import DashNavbar from "./dashNavbar";
import "../../../src/css/addButton.css";
import herhub from "../../assets/herhub2.png";
import AddShelterSpaceModal from "./addShelterSpaceModal";
import { getShelterSpace, deleteShelterSpace } from "../../api/shelterSpaceApi";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";

const ShelterSpace = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [resourceId, setResourceId] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleIsOpen = (id = null) => {
    setResourceId(id);
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    fetchShelterSpace();
  }, [isOpen]);

  const fetchShelterSpace = async () => {
    try {
      const shelterSpace = await getShelterSpace();
      setData(shelterSpace);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item")) {
      try {
        const response = await deleteShelterSpace(id);
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
        <AddShelterSpaceModal
          isOpen={isOpen}
          handleIsOpen={handleIsOpen}
          resourceId={resourceId}
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
                        <b>LiveStock:</b> {res?.livestock_id?.type}
                      </p>
                      <p className="mb-1">
                        <b>Weight:</b> {res?.livestock_id?.weight}
                      </p>
                      <p className="mb-1">
                        <b>Ventilation:</b> {res?.ventilation}
                      </p>
                      <p className="mb-1">
                        <b>Available Shelter:</b> {res?.available_shelter}
                      </p>
                      <p className="mb-1">
                        <b>Shelter Type:</b> {res?.shelter_type}
                      </p>
                      <p className="mb-1">
                        <b>Resting Area:</b> {res?.resting_area}
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

export default ShelterSpace;
