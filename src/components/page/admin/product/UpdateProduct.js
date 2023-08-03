import React, { useEffect, useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { readProduct, updateProduct } from "../../../function/product";
import { listCategory } from "../../../function/category";
import MenubarAdmin from "../../../layout/MenubarAdmin";
import { useParams, useNavigate } from "react-router-dom";
import FileUpload from "./FileUpload";
import { Spin } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const UpdateProduct = () => {
  const parems = useParams();
  const navigate = useNavigate();
  console.log(parems.id);
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);

  const initialstate = {
    title: "",
    categories: [],
    description: "",
    category: "",
    price: "",
    quantity: "",
    images: [],
  };
  const [category, setCategory] = useState([]);
  const [values, setValues] = useState(initialstate);
  const [description, setDescription] = useState("");
  useEffect(() => {
    loadData();

    // eslint-disable-next-line
  }, []);

  const loadData = async () => {
    readProduct(parems.id)
      .then((res) => {
        setValues({ ...values, ...res.data });
        setDescription(res.data.description);
      })

      .catch((err) => {
        console.log(err);
      });

    listCategory(user.user.token)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(values);
  console.log(category);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleDescription = (e) => {
    setDescription(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateProduct(user.user.token, values._id, {
      ...values,
      description: description,
    })
      .then((res) => {
        console.log(res);
        setLoading(false);
        toast.success("Update Success");
        navigate("/admin/index");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    console.log("valueProduct", values);
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
              Loading <Spin size="large" />
            </h1>
          ) : (
            <h1> Update Product Admin</h1>
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
              {/* <Form.Control type="text" as="textarea" rows={3} placeholder="Enter description" value={values.description} name='description' onChange={handleChange} /> */}
              <ReactQuill value={description} onChange={handleDescription} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>category</Form.Label>
              <Form.Select
                placeholder="Select category"
                name="category"
                onChange={handleChange}
              >
                <option>{values.category.name}</option>
                {category.length > 0 &&
                  category.map((item, index) => (
                    <option key={index} value={item._id}>
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
              Update Product
            </Button>
            <Toaster />
          </Form>
        </Col>
      </Row>
      <Toaster />
    </Container>
  );
};

export default UpdateProduct;
