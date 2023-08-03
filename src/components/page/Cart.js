import React from 'react'
import {Button,Container,Col,Row,Table  } from 'react-bootstrap';
import {useSelector } from 'react-redux';
import {useNavigate } from 'react-router-dom';
import ProductTable from '../card/ProductTable';
import { formatMoney } from '../function/formatMoney';
//function
import { userCart } from '../function/user';

const Cart = () => {
    const{user,cart}=  useSelector((state)=>({...state}))
  const navigate = useNavigate()
    const getTotal = ()=>{
        return cart.cart.reduce((currentValue,nextValue)=>{
            return currentValue+nextValue.count*nextValue.price ;
        },0)
    }
    const handleSaveOrder = ()=>{
      alert("Check Out")

      userCart(user.user.token,cart.cart)
      .then((res)=>{
      console.log(res);
      navigate('/checkout')}

      ).catch((err)=>
      console.log(err))
    }
    const ShowCartItem = ()=>{
      return(
       <> 
       <Table >
        <thead>
        <tr>
          <th className='p-2' >Image</th>
          <th >Title</th>
          <th >Count</th>
          <th >Price</th>
          <th >Delete</th>
        </tr>
      </thead>
      </Table>
       {cart.cart.map((item,index)=>(
      <ProductTable key={index} item={item}/>))}
      </>)
    }
  return (
    <Container fluid>
    <Row className='justify-content-md-center'>
   <Col md={7}>
   Product Order
 <ShowCartItem/>
   </Col>
   <Col md={4}>
      <h3>Summary </h3> 
      {cart.cart.map((item,i)=>(
       <Row  > 
       <Col key={i}>{item.title} </Col> 
        <Col> x  {item.count}   ฿ {formatMoney(item.price*item.count) } </Col>   
        </Row> 
        ))}
        <hr />
        <h4>Total : ฿  {formatMoney(getTotal()) }</h4>
        <hr />
    <Button disabled={cart.cart.length  >= 1 ? false:true} onClick={handleSaveOrder} >Check Out</Button>
   </Col>
</Row>
</Container>
  )
}
export default Cart
