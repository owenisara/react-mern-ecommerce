import React, { useEffect, useState } from 'react'
import { readProduct } from '../function/product'
import { useParams } from 'react-router-dom'
import{Row,Col, Container,Card,Button,Badge,Spinner} from 'react-bootstrap'
import { BsCart4 } from "react-icons/bs";
import SingleProductCard from '../card/SingleProductCard'
import { useSelector,useDispatch } from 'react-redux';
import { addtoCart } from '../store/Cart';
import { parse } from "react-html5-parser";

import _ from 'lodash'
const SingleProduct = () => {
 const params = useParams()
const [product,setProduct]= useState([])
const[loading,setLoading]= useState(false)
const[btn,setBtn]=useState(false)
const dispatch = useDispatch()
const {user} = useSelector((state)=>({...state}))


const handleAddtoCart = ()=>{
  let cart = []
  if(localStorage.getItem('cart')){
      cart=JSON.parse(localStorage.getItem("cart")) 
  }
  cart.push({...product,count:1});
	let unique = _.uniqWith(cart,_.isEqual)
    localStorage.setItem("cart",JSON.stringify(unique));

		dispatch(addtoCart(unique))
  setBtn(true)
}

 useEffect(()=>{
  setLoading(true)
    loadData()
    // eslint-disable-next-line
 },[])
 const loadData =()=>{
    readProduct(params.id)
    .then((res)=>{
        setProduct(res.data)
        setLoading(false)    
    }).catch((err)=>
    console.log(err))
 }
  return (
    <>
    <Container fluid>
    {loading ? <h3>Loading...<Spinner animation="border" /> </h3> : 
    (  <Row className='justify-content-center pt-5'>
    <Col md={5}>
    <SingleProductCard product={product}/>
    </Col>

    <Col md={5} className='pt-5'>
       <Card>
  <Card.Header as="h5"></Card.Header>
  <Card.Body>
    <Card.Title >{product.title}</Card.Title>
    <Card.Text>Price : ฿{product.price}</Card.Text>
    <Card.Text>In stock : {product.quantity}</Card.Text>
    {
        product.category &&
        <Card.Text>
          <Badge bg="secondary">{product.category.name}</Badge>
        </Card.Text>
    }
    <Card.Text>
      {parse(product.description)  }
    </Card.Text>
    {
      user.user &&( <Button variant="primary" disabled={btn} onClick={handleAddtoCart}>{btn ?
        "Product in Cart"
        :"Add to Cart " 
         } <BsCart4/></Button> )
    }
   
  </Card.Body>
</Card>
    </Col>
</Row>)}
        
    </Container>
   
    </>
  )
}

export default SingleProduct
