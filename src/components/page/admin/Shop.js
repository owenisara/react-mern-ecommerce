import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProductCard from '../../card/Productcard'
import { listProduct,searchFilters } from '../../function/product'
import { listCategory } from '../../function/category'
import { Container, Row,Col,Button,Spinner  } from 'react-bootstrap'
const Shop = () => {
const [product,setProduct]= useState([])
const[loading,setLoading]= useState(false)
const[category,setCategory]=useState([])

const{search} = useSelector((state)=>({...state}))
const{text}= search
// console.log('search',text)

useEffect(()=>{
    loadData()
    listCategory().then(res=>setCategory(res.data))
},[])
//Load Data use Filter Search
useEffect(()=>{
    const delay = setTimeout(()=>{
    fetchDataFilter({query:text})
    },700)
   return()=> clearTimeout(delay)
   // eslint-disable-next-line
},[text])

//Load Data use Filter Category


const loadData = ()=>{
    setLoading(true)
    listProduct(12)
    .then((res)=>{
        setProduct(res.data)
        setLoading(false)
       
    }).catch((err)=>{
        console.log(err)
        setLoading(false)
    })
}

const fetchDataFilter = (arg)=>{
    setLoading(true)
    searchFilters(arg)
    .then((res)=>{
        setProduct(res.data)
        setLoading(false)
    }).catch((err)=>{
        console.log(err)
        setLoading(false)
    })
   if(text===""){
        loadData()
   }
}

 const handleCategory = (category)=>{
    setLoading(true)
    searchFilters({category:category})
    .then((res)=>{
        setProduct(res.data)
        setLoading(false)
    }).catch((err)=>{
        console.log(err)
        setLoading(false)
    })

    }
  return (
        <Container fluid>
        <Row className='justify-content-center'>
          <Row className='text-center mt-4' >
        <Col >
       <Button className='m-2'  variant="primary" onClick={loadData}>All</Button>
       {
        category.map((item)=>(<Button  key={item._id} className='class="text-primary" m-2' variant="primary"
         onClick={()=>handleCategory(item)} >{item.name}</Button> ))
       }
        </Col>
        </Row>
       <Col md={10}   >
        <Row  className='justify-content-start'>
         {loading ? <h3>Loading...<Spinner animation="border" /> </h3> : <h3>Product </h3> }
        {product.length < 1 && <p> No Product found </p>}

        { product.map((item,index)=>
        <Col  key={index}    >    
            <ProductCard key={index} product={item}/>     
        </Col>
        )} 
       </Row>
     </Col>
     </Row>
      {/* <ProductCard/> */}
        </Container>
  )
}

export default Shop
