import React from 'react';
import { Card, Col } from 'react-bootstrap';

const LivestockCard = ({ livestock }) => {
  const { name, type, breed, id } = livestock; 

  return (
    <Col xs={12} md={6} lg={4}>
      <Card>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            Type: {type}<br />
            Price: {breed}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default LivestockCard;
