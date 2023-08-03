import React from 'react'
import Resize from 'react-image-file-resizer'
import { Form } from 'react-bootstrap';
import { Avatar, Badge, Space } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
const FileUpload = ({values,setValues,loading,setLoading}) => {
    const{user} = useSelector((state)=>({...state}))

    const handleRemove = (public_id)=>{
        const {images} = values
        axios.post(`${process.env.REACT_APP_API}/removeimages`,{public_id},
        {
            headers:{
                authtoken:user.user.token
            }
        }).then((res)=>{
            let filterImage = images.filter((item)=>{
                return item.public_id !== public_id
            });
            setValues({...values,images:filterImage})
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
        console.log(public_id)
    }
    const handleChangeFile = (e)=>{
        const files = e.target.files 
        if(files){
            setLoading(true)
            let allfileUpload = values.images
            for(let i=0 ; i < files.length;i++ ){
                Resize.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (uri)=>{
                        axios.post(`${process.env.REACT_APP_API}/images`,
                        {
                            image:uri
                        },{
                            headers:{
                                authtoken:user.user.token
                            }
                        }).then(res=>{
                            setLoading(false)
                            console.log(res)
                            allfileUpload.push(res.data)
                            setValues({...values,images:allfileUpload})
                        }).catch(err=>{
                            console.log(err)
                        })
                       console.log(uri)
                    },
                    "base64"
                )
            }
        }

    }
  return (
    <>
    <br />
    {values.images && values.images.map((item,index)=>
    <Space key={index} size={40}>
    <Badge style={{cursor:'pointer'}} onClick={()=>handleRemove(item.public_id)} count='x'>
      <Avatar className='m-3' src={item.url} shape="square" size={180} />
    </Badge>
    </Space>
        )}
        <hr />
      <Form.Group className="mb-3" >
     <Form.Control type="file" name='file'  multiple accept='images/*' onChange={handleChangeFile} />
     </Form.Group>
    </>
  
   
  )
}

export default FileUpload
