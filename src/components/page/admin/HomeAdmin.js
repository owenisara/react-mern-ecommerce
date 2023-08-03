import React, { useEffect, useState } from "react";
import MenubarAdmin from "../../layout/MenubarAdmin";
import { Container, Col, Row, Spinner } from "react-bootstrap";
import { listProduct, removeproduct } from "../../function/product";
import AdminProductCard from "../../card/AdminProductCard";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
const HomeAdmin = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadData({});
  }, []);

  const loadData = (count) => {
    setLoading(true);
    listProduct(count)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleRemove = (id) => {
    if (window.confirm("Are you sure")) {
      removeproduct(user.user.token, id)
        .then((res) => {
          console.log(res);
          loadData(10);
          toast.success("Remove Product Success");
        })
        .catch((err) => {
          console.log(err);
        });
    }

    console.log(id);
  };
  return (
    <Container fluid>
      <Row>
        <Col md={2}>
          <MenubarAdmin />
        </Col>
        <Col>
          {loading ? (
            <h1>
              Loding...
              <Spinner animation="border" />{" "}
            </h1>
          ) : (
            <h1> Home Admin</h1>
          )}
          <Row className="justify-content-start ">
            {product.map((item, index) => (
              <Col key={index}>
                <AdminProductCard product={item} handleRemove={handleRemove} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Toaster />
    </Container>
  );
};

export default HomeAdmin;
