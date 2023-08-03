import React from "react";
import { Col, Row, Form } from "react-bootstrap";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addtoCart } from "../store/Cart";
import toast, { Toaster } from "react-hot-toast";
import { formatMoney } from "../function/formatMoney";
const ProductTable = ({ item }) => {
  const dispatch = useDispatch();
  const handleChangCount = (e) => {
    const count = e.target.value < 1 ? 1 : e.target.value;
    if (count > item.quantity) {
      console.log("Max aviable Quantify");
      toast.error("Max aviable Quantify :" + item.quantity);
      return;
    }
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, i) => {
      if (product._id === item._id) cart[i].count = Number(count);
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch(addtoCart(cart));
  };
  const handleRemove = () => {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, i) => {
      if (product._id === item._id) {
        cart.splice(i, 1);
      }
      // eslint-disable-next-line
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch(addtoCart(cart));
  };
  return (
    <>
      <Row className="border align-items-center">
        <Col>
          <img width={90} src={item.images[0].url} alt="" />
        </Col>
        <Col md={3} className="d-flex align-items-center">
          <span>{item.title} </span>
        </Col>
        <Col className="d-flex align-items-center">
          <Form className="pt-3">
            <Form.Control
              style={{ width: "4rem" }}
              type="number"
              value={item.count}
              onChange={handleChangCount}
            />
          </Form>
        </Col>
        <Col className="d-flex align-items-center">
          <span>{formatMoney(item.price)} </span>
        </Col>
        <Col className="d-flex align-items-center">
          <BsFillTrash3Fill
            style={{ cursor: "pointer" }}
            onClick={handleRemove}
            className="text-danger"
          />
        </Col>
      </Row>
      <Toaster />
    </>
  );
};

export default ProductTable;
