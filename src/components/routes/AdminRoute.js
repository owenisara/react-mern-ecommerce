import React, { useEffect, useState } from 'react'
import { useSelector  } from 'react-redux'
import LoadingToRediract from './LoadingToRediract'
import { currentAdmin } from '../function/auth'

const   AdminRoute =  ({children}) => {

    const {user} = useSelector ((state)=>({...state}))
    const[isAdmin,setIsAdmin] = useState(false)

       useEffect( ()=>{
        if(user.user && user.user.token)
         currentAdmin(user.user.token)
        .then(res=>{
          setIsAdmin(true)
        }).catch(err=>{
            console.log(err)
             setIsAdmin(false)
         }) 
        },[user])
            
        
   
   
    return    isAdmin 
    ?  children 
    : <LoadingToRediract/>
   
  
}

export default AdminRoute
