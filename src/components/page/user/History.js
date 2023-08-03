import React, { useEffect, useState } from 'react'
import { Container,Row,Col,Card,Table,Spinner  } from 'react-bootstrap'
import { getOrder } from '../../function/user'
import { useSelector } from 'react-redux'
import { formatMoney } from '../../function/formatMoney'
import moment from 'moment' ;
const History = () => {

    const{user} = useSelector((state)=>({...state}))
    const[loading,setLoading]=useState(false)
    const[orders,setOrders]=useState([])

    useEffect(()=>{
        loadData()
        // eslint-disable-next-line
    },[])

    const loadData = ()=>{
       setLoading(true)
        getOrder(user.user.token)
        .then((res)=>{
            console.log(res.data)
            setOrders(res.data)
            setLoading(false)
        })
        .catch((err)=>{
          console.log(err)
          setLoading(false)
        })
    }
  return (
    <Container fluid>
    <Row className='justify-content-center ' >
  <Col md={8}>
    <Row className=' text-center p-3 mt-5'>
       <h1>Order History </h1> 
   </Row>
   { 
    loading ?   <h1>Loading...<Spinner animation="border" /></h1>    :  ( 
    
   <Row className='justify-content-center '>
     {/*loop 1 Order Card*/}
     {orders.map((item,index)=>{
      return <>
      <Card key={index} className='mt-4'>
        <Table striped>
        <thead>
        <tr  >
          <th>Title</th>
          <th>Price</th>
          <th>Count</th>
        </tr>
      </thead>
        {/*loop 2 Order Card*/}
      <tbody>
        {item.products.map((p,i)=>
         <tr key={i}>
          <td>{p.product.title}</td>
          <td>{formatMoney(p.price*p.count) }</td>
          <td>{p.count}</td>
         
        </tr>
        )}
        <tr>
          <td  className='text-center' colSpan={3}>
           <b>Summary : {formatMoney(item.cartTotal) } </b> 
          </td>
        </tr>
        <tr>
          <td className='text-center' colSpan={3} ><b>Status : {item.orderstatus} </b> </td>
         
        </tr>
        <tr> 
           <td className='text-center' colSpan={3} ><b>Created : {moment(item.createdAt).format('ll')} </b></td>
        </tr>
      </tbody>
        </Table>
       </Card> </>
     }
     ).reverse()}
   </Row>)
   }
   
  </Col>
 </Row>
   </Container>
  )
}

export default History
