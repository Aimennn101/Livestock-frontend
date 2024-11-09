import axios from 'axios'; 

export const FETCH_LIVESTOCK_REQUEST = 'FETCH_LIVESTOCK_REQUEST';
export const FETCH_LIVESTOCK_SUCCESS = 'FETCH_LIVESTOCK_SUCCESS';
export const FETCH_LIVESTOCK_FAILURE = 'FETCH_LIVESTOCK_FAILURE';

export const fetchUserLivestock = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_LIVESTOCK_REQUEST });

  try {
    const response = await axios.get(`/api/livestock?ownerId=${userId}`); // Replace with your API endpoint
    dispatch({ type: FETCH_LIVESTOCK_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_LIVESTOCK_FAILURE, payload: error.message });
  }
};
