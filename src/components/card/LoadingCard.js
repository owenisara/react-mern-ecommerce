import React from "react";
import { Skeleton, Card } from "antd";
import { Row, Col } from "react-bootstrap";
const LoadingCard = ({ count }) => {
  let cards = [];

  const Loopcard = () => {
    for (let i = 0; i <= count; i++) {
      cards.push(
        <Col key={i}>
          <Card>
            <Skeleton active />
          </Card>
        </Col>
      );
    }

    return cards;
  };

  return (
    <>
      <Row>{Loopcard()}</Row>
    </>
  );
};

export default LoadingCard;
