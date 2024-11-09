import React, { useState, useEffect } from 'react';
import axios from 'axios'; // for API calls

const FeedingRoutine = () => {
  const [selectedLivestock, setSelectedLivestock] = useState(null); // Selected livestock ID
  const [feedingRoutines, setFeedingRoutines] = useState([]); // List of feeding routines
  const [editMode, setEditMode] = useState(false); // Edit mode flag
  const [selectedRoutine, setSelectedRoutine] = useState(null); // Selected routine for edit/delete
  const [newRoutineData, setNewRoutineData] = useState({ details: '', time: '' }); // New routine data

  // Fetches all feeding routines on component mount
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/feeding-routines'); // Replace with your actual API endpoint
      setFeedingRoutines(response.data);
    };
    fetchData();
  }, []);

  // Handles livestock selection
  const handleLivestockChange = (event) => {
    setSelectedLivestock(event.target.value);
    setFeedingRoutines([]); // Clear routines on livestock change
    setEditMode(false);
    setSelectedRoutine(null);
  };

  // Fetches feeding routines for selected livestock
  const handleGetRoutines = async () => {
    if (selectedLivestock) {
      const response = await axios.get(`/api/feeding-routines?livestockId=${selectedLivestock}`); // Replace with your actual endpoint
      setFeedingRoutines(response.data);
    }
  };

  // Handles creating a new feeding routine
  const handleCreateRoutine = async (data) => {
    try {
      const response = await axios.post('/api/feeding-routines', data); // Replace with your actual endpoint
      setFeedingRoutines([...feedingRoutines, response.data]); // Add new routine to list
      setSelectedLivestock(null); // Clear selection after creation
      setNewRoutineData({ details: '', time: '' }); // Reset new routine form
    } catch (error) {
      console.error(error);
      // Handle errors appropriately (e.g., display error message)
    }
  };

  // Handles updating an existing feeding routine
  const handleUpdateRoutine = async (data) => {
    try {
      const response = await axios.put(`/api/feeding-routines/${selectedRoutine}`, data); // Replace with your actual endpoint
      const updatedRoutines = feedingRoutines.map((routine) =>
        routine._id === selectedRoutine ? response.data : routine
      );
      setFeedingRoutines(updatedRoutines);
      setEditMode(false);
      setSelectedRoutine(null);
    } catch (error) {
      console.error(error);
      // Handle errors appropriately
    }
  };

  // Handles deleting a feeding routine
  const handleDeleteRoutine = async (id) => {
    try {
      await axios.delete(`/api/feeding-routines/${id}`); // Replace with your actual endpoint
      const updatedRoutines = feedingRoutines.filter((routine) => routine._id !== id);
      setFeedingRoutines(updatedRoutines);
    } catch (error) {
      console.error(error);
      // Handle errors appropriately
    }
  };

  // Toggles edit mode for a specific routine
  const handleEditRoutine = (id) => {
    setEditMode(true);
    setSelectedRoutine(id);
    const routineToEdit = feedingRoutines.find((routine) => routine._id === id);
    setNewRoutineData(routineToEdit); // Populate form with existing data
  };

  // Handles changes in new routine form
  const handleNewRoutineChange = (event) => {
    setNewRoutineData({ ...newRoutineData, [event.target.name]: event.target.value });
  };

  // Handles submitting the new routine form
  const handleSubmitNewRoutine = (event) => {
    event.preventDefault();
    handleCreateRoutine({ ...newRoutineData, livestockId: selectedLivestock });
  };

  return (
    <div className="feeding-routine-container">
      <h2>Feeding Routine Management</h2>
      <div className="selection-bar">
        <select value={selectedLivestock} onChange={handleLivestockChange}>
          <option value="">Select Livestock</option>
          {/* Replace with options dynamically fetched from your backend */}
          <option value="1">Cow 1</option>
          <option value="2">Sheep 2</option>
        </select>
        <button onClick={handleGetRoutines} disabled={!selectedLivestock}>
          Get Feeding Routines
        </button>
      </div>
      {selectedLivestock && (
        <div className="routines-list">
          {feedingRoutines.length > 0 ? (
            feedingRoutines.map((routine) => (
              <div className="routine-card" key={routine._id}>
                <p>
                  {routine.details} (Time: {routine.time})
                </p>
                <button onClick={() => handleEditRoutine(routine._id)}>Edit</button>
                <button onClick={() => handleDeleteRoutine(routine._id)}>Delete</button>
              </div>
            ))
          ) : (
            <p>No feeding routines found for this livestock.</p>
          )}
        </div>
      )}
      {selectedLivestock && (
        <div className="new-routine-form">
          <h3>Create New Routine</h3>
          <form onSubmit={handleSubmitNewRoutine}>
            <label htmlFor="details">Details:</label>
            <input
              type="text"
              id="details"
              name="details"
              value={newRoutineData.details}
              onChange={handleNewRoutineChange}
              required
            />
            <label htmlFor="time">Time:</label>
            <input
              type="time"
              id="time"
              name="time"
              value={newRoutineData.time}
              onChange={handleNewRoutineChange}
              required
            />
            <button type="submit" disabled={editMode}>
              {editMode ? 'Update' : 'Create Routine'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FeedingRoutine;
