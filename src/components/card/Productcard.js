import React from "react";
import { Card, Badge, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { formatMoney } from "../function/formatMoney";
import { parse } from "react-html5-parser";
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { _id, title, description, images, price } = product;
  // console.log(product)

  return (
    <>
      <Row xs={1} md={2} lg={3} className="justify-content-center ">
        <Card
          onClick={() => navigate("/product/" + _id)}
          className="m-3"
          style={{ width: "16rem", background: "cecece", cursor: "pointer" }}
        >
          <Card.Img
            variant="top"
            style={{ height: "250px" }}
            src={images && images.length ? images[0].url : ""}
          />
          <Card.Body>
            <Card.Title>{title.substring(0, 20)}</Card.Title>
            <Badge bg="primary">{product.category.name}</Badge>
            <Card.Text>{parse(description.substring(0, 25))}</Card.Text>
            <Card.Text className="fs-4"> ฿ {formatMoney(price)}</Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
};

export default ProductCard;
