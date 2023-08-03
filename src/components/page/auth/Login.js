import React, { useState } from 'react'
import {login} from '../../function/auth'
import {useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { loginUser } from '../../store/Reducer'
import {Form,Button, Container ,Col,Row } from 'react-bootstrap';
import {BsRocketTakeoffFill} from "react-icons/bs";
import ecommerce from '../../../image/Ecommerce.png'

const Login = () => {
    
    const [value,setValue] = useState({email:"",password:""})
    const navigate = useNavigate()
  //Redux 

    const dispatch = useDispatch()
 
    const handleChange =(e)=>{
        setValue({...value,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(value)
         login(value)
         .then((res)=>{
            console.log(res.data);
            alert(res.data)
            dispatch(loginUser({token:res.data.token,
              email:res.data.payload.email.email,
              role: res.data.payload.email.role}))
              localStorage.setItem('token',res.data.token)

            if(res.data.payload.email.role === "admin"){
              navigate('/admin/index')
            }
            else{
              navigate('/')
            }
           
        }).catch((err)=>{
            console.log(err.response.data)
            alert(err.response.data)
        })
    }
  return (
    
  
    <Container>
      <Row className='text-center '>
        <Col> 
        <img width={300} src={ecommerce} alt="ecommerce" />
         <h2><b><BsRocketTakeoffFill className='text-primary'/> Space</b></h2>
        </Col>
      </Row>
      <Row  className="justify-content-md-center mt-1  ">

    <Col md={4}  >
   <Form  onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control  type="email" placeholder="Enter email" name='email' onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control  type="password" placeholder="Password" name='password' onChange={handleChange} />
      </Form.Group>
      <Button variant="primary" type='submit' >Login</Button>
    </Form>  
    </Col>
    </Row>
    </Container>
  )
}

export default Login
