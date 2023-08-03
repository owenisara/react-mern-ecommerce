import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import {
  getUserCart,
  saveAddress,
  saveOrder,
  emptyCart,
} from "../function/user";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/Cart";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import FileUpload from "./admin/product/FileUpload";
import toast, { Toaster } from "react-hot-toast";
import kasikorn from "../../image/kasikorn.gif";
import { formatMoney } from "../function/formatMoney";
const CheckOut = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [products, setProducts] = useState([]);
  const [values, setValues] = useState({ images: [] });
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getUserCart(user.user.token).then((res) => {
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
    // eslint-disable-next-line
  }, []);

  const handleSaveAddress = () => {
    console.log(address);
    if (address) {
      saveAddress(user.user.token, address).then((res) => {
        console.log(res.data);
        setAddressSaved(!addressSaved);
        toast.success("Save Address Success");
      });
    } else {
      toast.error("Address isRequire");
    }
  };

  const handleCreateOrder = () => {
    saveOrder(user.user.token, values)
      .then((res) => {
        console.log(res.data);
        emptyCart(user.user.token);
        dispatch(clearCart());

        if (typeof window !== "undefined") {
          localStorage.removeItem("cart");
        }

        toast.success("Save Order Success");
        navigate("/history");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container fluid>
      <Row className="justify-content-center ">
        <Col md={8}>
          <Row className="p-3 mt-5">
            <Form.Group className="mb-3">
              <Form.Label>
                {" "}
                <h3>Address </h3>{" "}
              </Form.Label>
              <Form.Control
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
                as="textarea"
                rows={3}
              />
              <br />
              <Button onClick={handleSaveAddress}>Save address </Button>
              <Toaster />
            </Form.Group>

            <hr />
          </Row>
          <Row className=" justify-content-center ">
            <h3>Order Summary </h3>
            <p>Product / {products.length}</p>
            {products.map((item, i) => (
              <div key={i}>
                <Row>
                  <Col> {item.product.title} </Col>x{" "}
                  <Col>
                    {item.count} = {formatMoney(item.price * item.count)}
                  </Col>
                </Row>
              </div>
            ))}
            <hr />
            <p>
              Total : <b> {formatMoney(total)}</b>
            </p>
            <hr />
          </Row>
        </Col>
        <Row className=" justify-content-center ">
          <Col md={8}>
            <h3>แนบหลักฐาน ชำระเงิน </h3>
            <p>
              <img src={kasikorn} alt="" /> ธนาคารกสิกรไทย บัญชี 012345XXXX
              ออมทรัพย์ สาขาสุขุมวิท นายสุดหล่อ XXX{" "}
            </p>
            {loading ? (
              <>
                Loading...
                <Spin size="middle" />{" "}
              </>
            ) : (
              ""
            )}
            <Form>
              <FileUpload
                values={values}
                setValues={setValues}
                loading={loading}
                setLoading={setLoading}
              />
            </Form>

            <hr />
          </Col>
        </Row>
        <Row className=" justify-content-center ">
          <Col md={8}>
            <Button
              onClick={handleCreateOrder}
              disabled={
                !addressSaved || !products.length || !values.images.length
              }
            >
              {" "}
              CheckOut{" "}
            </Button>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default CheckOut;
