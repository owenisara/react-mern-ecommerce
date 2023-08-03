import React, { useEffect, useState } from 'react'
import MenubarAdmin from '../../layout/MenubarAdmin'
import { Container,Col, Row ,Table ,Form,Modal,Button } from 'react-bootstrap';
import { listUser,changeStatus,changeRole,removeUser,resetPsssword } from '../../function/user';
import {useSelector } from 'react-redux'
import { BsTrash,BsFillPencilFill } from "react-icons/bs";
import moment from 'moment' ;

const ManageAdmin = () => {
  // ข้อมูลในตารางต้นฉบับ
    const [data,setData]= useState([])
  // ข้อมูลที่เลือก
    const [selectData,setSelectData]= useState([])
    const {user} = useSelector((state)=>({...state}))
  const[values,setValue]= useState({
    id:"",
    password:""
  })
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleShow = (id) => {
      setShow(true);
      setValue({...values,id:id})
    
    } 

    const handleChangePassword = (e)=>{
      console.log(e.target.name)
        console.log(e.target.value)
        setValue({...values,[e.target.name]:e.target.value})
    }

    const handleOk = ()=>{
      resetPsssword(user.user.token,values.id,{values})
      .then(res=>{
        console.log(res)
        loadData(user.user.token)
     }).catch(err=>{
         console.log(err.response)
     })
      handleClose()
    }

   // console.log('adminpage',user.user.token)
    useEffect(()=>{
        loadData(user.user.token)
        // eslint-disable-next-line
    },[])

    const loadData = (authtoken)=>{
        listUser(authtoken)
        .then(res=>{
           setData(res.data)
           setSelectData(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }

    const handleOnchange = (e,id)=>{
      const value = {
        id:id,
        enabled:e
      }
      changeStatus(user.user.token,value)
      .then(res=>{
        loadData(user.user.token)
      }).catch(err=>{
        console.log(err)
      })
    }

    const handleChangeRole = (e,id)=>{
      console.log(e,id)
      const value = {
        id:id,
        role:e
      }
      changeRole(user.user.token,value)
      .then(res=>{
        loadData(user.user.token)
      }).catch(err=>{
        console.log(err.response)
      })
    }

    const handleRemove = (id)=>{
      if(window.confirm("Are You Sure Delete")){
        removeUser(user.user.token,id)
        .then(res=>{
          loadData(user.user.token)

        }).catch(err=>{
          console.log(err.response)
        })
      }
    }
    const roleData = ['admin','user']
    const selectDrop = ['all', 'admin','user']

    const handleSelectRole = (e)=>{
      console.log('select',e.target.value)
      const value = e.target.value
      if(value === "all"){
        setSelectData(data)
      }else{
        const filterData = data.filter((item,index)=>{
          return item.role === value
        })
       setSelectData(filterData)
      }
      
    }
  return (
    <Container fluid>
    <Row>
    <Col md={2}>
    <MenubarAdmin/>
    </Col>
    <Col md={9}>
    <h1>Manage Admin</h1>
    <Form.Select onChange={(e)=>handleSelectRole(e)} > 
      { selectDrop.map((item,index)=>(<option key={index} value={item}>{item}</option>) )}  
        
     
    </Form.Select>
    <Table striped>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone</th>
          <th>email</th>
          <th>role</th>
          <th>status</th>
          <th>creaeted</th>
          <th>updated</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        {selectData.map((item,index)=>(
        <tr key={index} >
          <td>{item.firstname}</td>
          <td>{item.lastname}</td>
          <td>{item.phone}</td>
          <td>{item.email}</td>
          <td>
            <Form.Select value={item.role} onChange={(e)=> handleChangeRole(e.target.value,item._id)}>
            {roleData.map((item,index)=>
            <option value={item} key={index}>{item}</option>)
            }
           </Form.Select>
           </td>
          <td> 
         <Form ><Form.Check checked={item.enabled}
           type="switch"
           onChange={(e)=>handleOnchange(e.target.checked,item._id)} 
           id="custom-switch"/></Form>
      </td>
          <td>{moment(item.createdAt).format('DD-MMMM-YYYY') }</td>
          <td>{moment(item.updatedAt).startOf(item.updatedAt).fromNow() }</td>
          <td><BsTrash onClick={()=>handleRemove(item._id)} />
              <BsFillPencilFill onClick={()=>handleShow(item._id)}  />
          </td>
        </tr>
        ))}
      </tbody>
    </Table>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>New Password</p>
          <input type='text' name="password" onChange={handleChangePassword} ></input></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOk}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  </Col>
  </Row>
  </Container>
  )
}

export default ManageAdmin
