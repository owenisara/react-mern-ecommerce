import React, { useEffect, useState } from "react";
import MenubarAdmin from "../../../layout/MenubarAdmin";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { createProduct } from "../../../function/product";
import { listCategory } from "../../../function/category";
import FileUpload from "./FileUpload";
import { Spin } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const CreateProduct = () => {
  const initialstate = {
    title: "",
    description: "",
    categories: [],
    category: "",
    price: "",
    quantity: "",
    images: [],
  };
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialstate);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(values.description);

  useEffect(() => {
    loadData(user.user.token);
    // eslint-disable-next-line
  }, []);

  const loadData = (authtoken) => {
    listCategory(authtoken)
      .then((res) => {
        setValues({ ...values, categories: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDescription = (e) => {
    setDescription(e);
    setValues({ ...values, description: description });
  };

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);

    setValues({ ...values, [e.target.name]: e.target.value });

    console.log(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(user.user.token, values)
      .then((res) => {
        console.log(res);
        toast.success(`Insert ${res.data.title} Success`);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("valueProduct", values);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={2}>
          <MenubarAdmin />
        </Col>
        <Col md={6}>
          {loading ? (
            <h1>
              Loading <Spin size="large" />
            </h1>
          ) : (
            <h1>Create Product</h1>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title "
                value={values.title}
                name="title"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <ReactQuill value={description} onChange={handleDescription} />
              {/* <Form.Control type="text" as="textarea" rows={3} placeholder="Enter description" value={values.description} name='description' onChange={handleChange} /> */}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>category</Form.Label>
              <Form.Select
                type="text"
                placeholder="Select category"
                name="category"
                onChange={handleChange}
              >
                <option>Please Select Category</option>
                {values.categories.length > 0 &&
                  values.categories.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>price</Form.Label>
              <Form.Control
                type="number"
                placeholder="price"
                value={values.price}
                name="price"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="quantity"
                value={values.quantity}
                name="quantity"
                onChange={handleChange}
              />
            </Form.Group>
            <FileUpload
              values={values}
              setValues={setValues}
              loading={loading}
              setLoading={setLoading}
            />
            <Button variant="primary" type="submit">
              Add Product
            </Button>
            <Toaster />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateProduct;
