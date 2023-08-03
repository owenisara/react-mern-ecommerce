import React, { useEffect, useState } from "react";
import { listProductBy } from "../function/product";
import ProductCard from "../card/Productcard";
import { Col, Row } from "react-bootstrap";
import LoadingCard from "../card/LoadingCard";

const NewProduct = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    listProductBy("createdAt", "desc", 4)
      .then((res) => {
        setLoading(false);
        setProduct(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <>
      {loading ? (
        <LoadingCard count={product.length} />
      ) : (
        <Row className="justify-content-center ">
          {" "}
          {product.map((item, index) => (
            <Col key={index}>
              <ProductCard key={index} product={item} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default NewProduct;
