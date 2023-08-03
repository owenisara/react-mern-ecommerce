import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Container,Row,Col,Card,Table,Form,Spinner } from 'react-bootstrap'
import toast,{Toaster} from 'react-hot-toast';
import { getOrderAdmin,ChangeStatus } from '../../function/admin';
import MenubarAdmin from '../../layout/MenubarAdmin'
import moment from 'moment' ;

const OrderAdmin = () => {
    const [orders,setOrders]=useState([])
    const { user } = useSelector((state)=>({...state}))
    const[loading,setLoading]= useState(false)
    useEffect(()=>{
        loadData();
        // eslint-disable-next-line
    },[])
    const loadData= ()=>{
      setLoading(true)
        getOrderAdmin(user.user.token)
        .then((res)=>{
            setOrders(res.data)
            setLoading(false)
        })
        .catch((err)=>{
            console.log(err)
            setLoading(false)
        })

    }
    //  console.log('orders',orders)
   
     const handleChangeStatus = ( orderId,orderstatus)=>{
        ChangeStatus(user.user.token,orderId,orderstatus)
        .then((res)=>{
        // console.log(res.data)
          toast.success('update status Success')
        loadData();
            })
        .catch(err=>console.log(err))
        
     };
  return (
    <Container fluid>
        <Row>
        <Col md={2}>
        <MenubarAdmin/>
        </Col>
        <Col md={9} >
         <h1>  Order Admin</h1>
         
        <Row className='justify-content-start '> 
    { loading ? <h3>Loading... <Spinner animation="border" /></h3> : ""}
        {orders.map((item,index)=>{
      return <>
      <Card key={index} className='mt-5'>
        <Row className='p-4' >
            <Col md={6} >
              <img width={220} src={item.images[0].url} alt="" />
            </Col>
            <Col md={5}>
              {item.orderdBy && 
              <Card.Body>
                <p>OrderBy : {item.orderdBy.firstname}  {item.orderdBy.lastname} </p>
                <p>Email : {item.orderdBy.email}  </p>
                <p>Tel : {item.orderdBy.phone}  </p>
                <p>Address : {item.orderdBy.address} </p>
                <p>Date : {moment(item.createdAt).format('ll')} </p>
                <br />
                <h4>Order Status</h4>
                <Form.Select value={item.orderstatus} onChange={(e)=>handleChangeStatus(item._id,e.target.value)} >
              <option value="Not Process">Not Process</option>
              <option value="Processing">Processing</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
            </Form.Select>
              </Card.Body>}
            </Col>
         </Row>
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
         <tr  key={i}>
          <td>{p.product.title}</td>
          <td>{p.price*p.count}</td>
          <td>{p.count}</td>
        
        </tr>
        )}
        <tr>
          <td  className='text-center' colSpan={3}>
           <b>Summary : {item.cartTotal} </b> 
          </td>
        </tr>
      </tbody>
        </Table>
       </Card> </>
     }
     ).reverse()}
        </Row>
      </Col>
      </Row>
       <Toaster/>
      </Container>
     
  )
}

export default OrderAdmin
