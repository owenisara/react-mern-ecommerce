import React from "react";
import { Card, Button, ButtonGroup, Badge, Row } from "react-bootstrap";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { parse } from "react-html5-parser";

const AdminProductCard = ({ product, handleRemove }) => {
  const { _id, title, description, images, category } = product;

  // console.log(product)
  return (
    <div>
      <Row xs={1} md={2} lg={4}>
        <Card
          className="mb-4"
          style={{ width: "16rem", background: "GhostWhite" }}
        >
          <Card.Img
            variant="top"
            style={{ height: "250px", overflow: "hidden" }}
            src={images && images.length ? images[0].url : ""}
          />
          <Card.Body>
            <Card.Title>{title.substring(0, 22)} </Card.Title>
            <Badge bg="secondary">{category.name}</Badge>
            <Card.Text>{parse(description.substring(0, 26))}</Card.Text>
            <hr />
            <ButtonGroup>
              <Link
                className="text-decoration-none"
                to={`/admin/update-product/${_id}`}
              >
                <Button className="me-2" variant="warning">
                  <AiOutlineEdit />
                  Edit{" "}
                </Button>
              </Link>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="danger" onClick={() => handleRemove(_id)}>
                <AiOutlineDelete /> Delete
              </Button>
            </ButtonGroup>
          </Card.Body>
        </Card>
      </Row>
    </div>
  );
};

export default AdminProductCard;
