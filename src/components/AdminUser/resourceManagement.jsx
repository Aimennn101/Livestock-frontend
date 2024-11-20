import { useEffect, useState } from "react";
import DashSidebar from "./dashSidebar";
import DashNavbar from "./dashNavbar";
import AddModal from "./addModal";
import "../../../src/css/addButton.css";
import { getResources } from "../../api/feedingRoutineApi";
import { Oval } from "react-loader-spinner"; 
import herhub from "../../assets/herhub2.png";
import { toast } from "react-toastify";
import { deleteResource } from "../../api/resourceManagmentApi";
import { formatDate } from "../../util/getFormatedDateAndTIme";

const ResourceManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [resourceId, setResourceId] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleIsOpen = (id = null) => {
    setResourceId(id);
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    fetchResources();
  }, [isOpen]);

  const fetchResources = async () => {
    try {
      const resources = await getResources();
      setData(resources);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item")) {
      try {
        const response = await deleteResource(id);
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
      {isOpen && <AddModal isOpen={isOpen} handleIsOpen={handleIsOpen} resourceId={resourceId} />}
      <div className="main-panel mt-5 mb-5">
        <div className="row align-content-center align-items-center justify-content-evenly">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh", width: "100%" }}>
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
            data.map((res) => (
              <div className="col-lg-4 col-md-6 pt-5 wow fadeInUp" data-wow-delay="0.5s" key={res._id}>
                <div className="service-item d-flex h-100 ">
                  <div className="service-img">
                    <img className="img-fluid" src={herhub} alt="" />
                  </div>
                  <div style={{ display: "flex", flexGrow: 2, justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div className="service-text p-5 pt-5">
                    <p className="mb-1"><b>Animal-Type :</b> {res?.feed_id?.livestock_id?.type}</p>
                      <p className="mb-1 "><b>Land Name:</b> {res?.land_id?.name}</p>
                      <p className="mb-1"><b>Location:</b> {res?.land_id?.location}</p>
                      <p className="mb-1"><b>Capacity:</b> {res?.land_id?.capacity}</p>
                      <p className="mb-1"><b>Feed-Type:</b> {res?.feed_id?.feed_type}</p>
                      <p className="mb-1"><b>Feed-Time:</b> {res?.feed_id?.feeding_time}</p>
                      <p className="mb-1"><b>Labor:</b> {res?.labor}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                    <div className="col-icon">
                      <div className="icon-primary" style={{ position: "relative", top: "40px", bottom: "20px", left: "-40px", right: "30px", color: "green", cursor: "pointer" }} onClick={() => { handleIsOpen(res?._id) }}>
                        <i className="fas fa-pen" style={{ color: "#EDDD5E" }}></i>
                      </div>
                    </div>
                    <div className="col-icon">
                      <div className="icon-danger" style={{ position: "relative", top: "250px", bottom: "20px", left: "-40px", color: "green", cursor: "pointer" }} onClick={() => { handleDelete(res?._id) }}>
                        <i className="fas fa-trash" style={{ color: "#BE2B44" }}></i>
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
      </div>

      <button className="floating-button" onClick={() => { handleIsOpen(null) }}>
        +
      </button>
    </div>
  );
};

export default ResourceManagement;
