// src/store/reducers/authReducer.js
const initialState = {
    token: null,
    isAuthenticated: false,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          token: action.payload,
          isAuthenticated: true,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  