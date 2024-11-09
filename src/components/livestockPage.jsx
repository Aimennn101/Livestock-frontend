import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchUserLivestock } from '../redux/actions/livestockActions'; // Import action

const LivestockPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedIn, userId, error, loading, livestock } = useSelector(state => ({
    loggedIn: state.auth.loggedIn,
    userId: state.auth.userId,
    error: state.livestock.error,
    loading: state.livestock.loading,
    livestock: state.livestock.livestock,
  }));

  useEffect(() => {
    if (loggedIn && userId) {
      dispatch(fetchUserLivestock(userId)); // Dispatch action on mount
    } else {
      navigate('/login');
    }
  }, [dispatch, loggedIn, userId, navigate]);

  const handleLogin = () => {
    // Replace with actual login logic that sets loggedIn state in Redux store
    navigate('/login'); // Simulate login for now
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Livestock Management</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          {loggedIn ? (
            <>
              <Button variant="primary">Add Livestock</Button>
              <Button variant="secondary">Logout</Button>
            </>
          ) : (
            <LoginForm onLogin={handleLogin} />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {loading ? (
            <p>Loading livestock data...</p>
          ) : error ? (
            <p>Error fetching livestock: {error}</p>
          ) : livestock.length > 0 ? (
            <LivestockCard key={animal.id} livestock={animal} />          ) : (
            <p>No livestock found.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default LivestockPage;
