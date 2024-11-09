const initialState = {
    livestock: [],
    error: null,
  };
  
  const livestockReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_USER_LIVESTOCK_SUCCESS':
        return {
          ...state,
          livestock: action.payload,
          error: null,
        };
      case 'GET_USER_LIVESTOCK_FAILURE':
        return {
          ...state,
          livestock: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default livestockReducer;
  