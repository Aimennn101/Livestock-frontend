import { useEffect, useState } from "react";
import DashSidebar from "./dashSidebar";
import DashNavbar from "./dashNavbar";
import "../../../src/css/addButton.css";
import AddModalForFeedingRoutine from "./addModalForFeedingRoutine";
import { getFeedingRoutines } from "../../api/feedingRoutineApi";
import { formatDate } from "../../util/getFormatedDateAndTIme";
import feedRoutine from "../../assets/feed-routine.svg"

const FeedingRoutine = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedingRoutineId, setFeedingRoutineId] = useState();
  const [data, setData] = useState([]);
  
  const handleIsOPen = ( id = null) => {
    setFeedingRoutineId(id);
    setIsOpen((prev) => !prev);
  };
  useEffect(()=>{
    fetchFeedingRoutines();
  }, [isOpen])

  const fetchFeedingRoutines = async () =>{
    try
    {
        const response = await getFeedingRoutines();
        setData(response)
    } catch(e){
        console.error(e);
    }
  }

  return (
    <div className="wrapper">
      <DashSidebar></DashSidebar>
      <DashNavbar></DashNavbar>
      {isOpen && <AddModalForFeedingRoutine isOpen={isOpen}  handleIsOPen={handleIsOPen} feedingRoutineId={feedingRoutineId}/> }
      <div className="main-panel mt-5">
        <div className="row align-content-center align-items-center justify-content-evenly">
          {data && data.length > 0 ? (
            data?.map((feed) => (
              <div
                className="card col-4 card-stats card-round"
                style={{ width: "30%" }}
                key={feed._id || feed.id}
              >
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-icon">
                      <div className="icon-big text-center icon-primary bubble-shadow-small">
                        <img src={feedRoutine}></img>
                      </div>
                    </div>
                    <div className="col col-stats ms-3 ms-sm-0">
                      <div className="numbers">
                      <p className="card-category"> <b >Type:</b> {feed?.livestock_id?.type}</p>
                      <p className="card-category"> <b>Quantity:</b> {feed?.quantity}</p>
                      <p className="card-category"> <b>Feed Type:</b> {feed?.feed_type}</p>
                        <p className="card-category"> <b>Routine:</b> {formatDate(feed?.feeding_time)}</p>
                      </div>
                    </div>
                    <div className="col-icon">
                      <div className="icon-primary " style={{position:"relative" , bottom:"20px", left:"25px", color:"green", cursor:"pointer"}} onClick={() => {handleIsOPen(feed?._id)}}>
                        <i className="fas fa-pen"></i>
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

      <button className="floating-button" onClick={()=>{handleIsOPen(null)}} >
        +
      </button>
    </div>
  );
};

export default FeedingRoutine;
