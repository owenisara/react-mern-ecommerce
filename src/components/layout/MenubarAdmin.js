import React from "react";
import { Container, Col,ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
const MenubarAdmin = () => {
  return (
    <Container fluid>
      <Col>
        <ListGroup className="text-center">
          <ListGroup.Item as={Link} to={"/admin/index"}>
            เเดชบอร์ด
          </ListGroup.Item>
          <ListGroup.Item as={Link} to={"/admin/manage-admin"}>
            จัดการผู้ใช้
          </ListGroup.Item>
          <ListGroup.Item as={Link} to={"/admin/create-category"}>
            เพิ่มหมวดหมู่
          </ListGroup.Item>
          <ListGroup.Item as={Link} to={"/admin/create-product"}>
            เพิ่มสินค้า
          </ListGroup.Item>
          <ListGroup.Item as={Link} to={"/admin/orders"}>
            จัดการOrder
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Container>
  );
};

export default MenubarAdmin;
