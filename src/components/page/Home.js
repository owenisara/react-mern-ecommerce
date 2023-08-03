import React from 'react'
import {Container, Row, Col } from "react-bootstrap";
import NewProduct from '../home/NewProduct';
const Home = () => {
  return (

   <Container fluid>
       <Row className='justify-content-center ' >
     <Col md={10}>
       <Row className=' text-center p-3 mt-5'>
          <h1>New Product </h1> 
      </Row>
      <Row  >
         <NewProduct/> 
      </Row>
     </Col>
    </Row>
      </Container>
  )
}

export default Home
