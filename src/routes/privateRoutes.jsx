const PrivateRoute = ({ children, ...rest }) => {

  const isLoggedIn = true; // Replace with actual authentication check

  return (
    <Route
      {...rest}
      element={isLoggedIn ? children : <Navigate to="/login" replace />}
    />
  );
};
