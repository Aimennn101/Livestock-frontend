import { useEffect, useState } from "react";
import DashSidebar from "./dashSidebar";
import DashNavbar from "./dashNavbar";
import "../../../src/css/addButton.css";
import AddModalForFeedingRoutine from "./addModalForFeedingRoutine";
import { getFeedingRoutines } from "../../api/feedingRoutineApi";
import { formatDate } from "../../util/getFormatedDateAndTIme";
import herhub from "../../assets/herhub2.png";
import { Oval } from "react-loader-spinner";  // Import the loader
import { toast } from "react-toastify";
import { deleteFeedingRoutine } from "../../api/feedingRoutineApi";

const FeedingRoutine = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedingRoutineId, setFeedingRoutineId] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state

  const handleIsOPen = (id = null) => {
    setFeedingRoutineId(id);
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    fetchFeedingRoutines();
  }, [isOpen]);

  const fetchFeedingRoutines = async () => {
    try {
      const response = await getFeedingRoutines();
      setData(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);  // Stop the loader once the data is fetched
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item")) {
      try {
        const response = await deleteFeedingRoutine(id);
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
        <AddModalForFeedingRoutine
          isOpen={isOpen}
          handleIsOPen={handleIsOPen}
          feedingRoutineId={feedingRoutineId}
        />
      )}

      <div className="main-panel mt-5">
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
            data.map((feed) => (
              <div
                className="col-lg-4 col-md-6 pt-5 wow fadeInUp"
                data-wow-delay="0.5s"
                key={feed._id}
              >
                <div className="service-item d-flex h-100">
                  <div className="service-img">
                    <img className="img-fluid" src={herhub} alt="" />
                  </div>
                  <div style={{ display: "flex", flexGrow: 2, justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div className="service-text p-5 pt-0">
                      <p className="mb-1 mt-5">
                        <b>Type:</b> {feed?.livestock_id?.type}
                      </p>
                      <p className="mb-1">
                        <b>Quantity:</b> {feed?.quantity}
                      </p>
                      <p className="mb-1">
                        <b>Feed Type:</b> {feed?.feed_type}
                      </p>
                      <p className="mb-1">
                        <b>Routine:</b> {formatDate(feed?.feeding_time)}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                    <div className="col-icon">
                      <div
                        className="icon-primary"
                        style={{
                          position: "relative",
                          top: "30px",
                          left: "-38px",
                          color: "green",
                          cursor: "pointer",
                        }}
                        onClick={() => handleIsOPen(feed?._id)}
                      >
                        <i className="fas fa-pen" style={{ color: "#EDDD5E" }}></i>
                      </div>
                    </div>
                    <div className="col-icon">
                      <div
                        className="icon-danger"
                        style={{
                          position: "relative",
                          top: "120px",
                          left: "-35px",
                          color: "green",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDelete(feed?._id)}
                      >
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
              No Feeding Routines to show. Please Add.
            </div>
          )}
        </div>
      </div>

      <button
        className="floating-button"
        onClick={() => handleIsOPen(null)}
      >
        +
      </button>
    </div>
  );
};

export default FeedingRoutine;
