import React, { useState } from 'react'
import { register } from '../../function/auth'

import {Form,Button,Container,Col,Row, } from 'react-bootstrap';
const Register = () => {
    const [value,setValue] = useState({firstname:"",lastname:"",phone:"",email:"",password:""})
    const handleChange =(e)=>{
        setValue({...value,[e.target.name]:e.target.value})
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(value)
        if(value.password !== value.password1 ){
            alert("Password not match")
        }else{
        register(value)
        .then((res)=>{
            console.log(res.data);
            alert(res.data)
        }).catch((err)=>{
            console.log(err.response.data)
            alert(err.response.data)
        })
        }
    }
    return (
  <Container >
      <Row className='text-center mt-3 '>
        <Col>
          <h2>Register</h2>
        </Col>
      </Row>
      <Row  className="justify-content-md-center mt-3 ">
    <Col md={4}  >
   <Form  onSubmit={handleSubmit}>
   <Form.Group className="mb-3" >
        <Form.Label >Firstname</Form.Label>
        <Form.Control  type="text" required placeholder="Enter firstname " name='firstname' onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Lastname</Form.Label>
        <Form.Control type="text" required placeholder="Enter lastname" name='lastname' onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Phone</Form.Label>
        <Form.Control type="text" required placeholder="Enter Tel." name='phone' onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" required placeholder="Enter email" name='email' onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" required placeholder="Password" name='password' onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Confirm password</Form.Label>
        <Form.Control type="password" required placeholder="Confirm Password" name='password1' onChange={handleChange} />
      </Form.Group>
      <Button variant="primary" type='submit' >Register</Button>
    </Form>  
    </Col>
    </Row>
    </Container>
  )
}

export default Register
