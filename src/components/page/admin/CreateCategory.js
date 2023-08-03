import React, { useEffect, useState } from "react";
import {
  Container,Row,Col,Form,Button,ListGroup,ButtonGroup,Modal
} from "react-bootstrap";
import MenubarAdmin from "../../layout/MenubarAdmin";
import {
  createCategory,
  listCategory,
  deleteCategory,
  readCategory,
  editCategory,
} from "../../function/category";
import {useSelector } from 'react-redux'
import toast,{Toaster} from 'react-hot-toast';
const CreateCategory = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [values, setValues] = useState({ name: "" });
  const [category, setCategory] = useState([]);
  const [nameCategory, setNamecategory] = useState({ name: "" });

  const {user} = useSelector((state)=>({...state}))

  console.log(user.user.token)
  useEffect(() => {
    loadData(user.user.token);
    // eslint-disable-next-line
  }, []);

  const loadData = (authtoken) => {
    listCategory(authtoken)
      .then((res) => {
        setCategory(res.data);
        console.log(category);
      })
      .catch((err) => {
        console.log(err);
        toast.error("This didn't work.")
      });
  };
  const handleChange = (e) => {
    console.log(values.name);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory(user.user.token,values)
      .then((res) => {
        console.log(res.data);
        loadData(user.user.token);
        toast.success('Successfully created!');
      })
      .catch((err) => {
        console.log(err);
        toast.error("This didn't work.")
      });
    setValues({ name: "" });
    console.log("click");
  };

  const handleDelete = (id) => {
   if(window.confirm("Are you sure Delete Category?")){
     deleteCategory(user.user.token,id)
      .then((res) => {
        console.log(res);
        loadData(user.user.token);
         toast.success('Successfully Delete!');
        
      })
      .catch((err) => {
        console.log(err);
      });
   }
  };

  const handleEdit = (id) => {
    readCategory(user.user.token,id)
      .then((res) => {
        setNamecategory(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("This didn't work.")
      });
    handleShow();
    console.log("Edit", id);
  };

  console.log(nameCategory);
  const handleOk = () => {
    editCategory(user.user.token,nameCategory._id, nameCategory)
      .then((res) => {
        loadData(user.user.token);
        setNamecategory({ name: "" });
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        toast.error("This didn't work.")
      });
  };

  return (
    <Container fluid>
      <Row>
        <Col md={2}>
          <MenubarAdmin />
        </Col>
        <Col md={6}>
          <h1>CreateCategory </h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>เพิ่มหมวดหมู่</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                name="name"
                required
                value={values.name}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add
            </Button>
            <Toaster/>
          </Form>

          <Col className="mt-4">
            <ListGroup>
              {category.map((item, index) => (
                <ListGroup.Item
                  className="d-flex justify-content-between align-items-start"
                  key={index}
                >
                  {item.name}
                  <ButtonGroup size="sm" className="mb-2">
                    <Button
                      variant="warning"
                      onClick={() => handleEdit(item._id)}
                    >
                      {" "}
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      
                      onClick={() => handleDelete(item._id)}
                    >
                      delete
                    </Button>
                  </ButtonGroup>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={nameCategory.name}
                required
                onChange={(e) =>
                  setNamecategory({ ...nameCategory, name: e.target.value })
                }
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOk}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CreateCategory;
