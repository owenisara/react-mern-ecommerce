import React from 'react'
import { useSelector  } from 'react-redux'
import LoadingToRediract from './LoadingToRediract'

const UserRoute = ({children}) => {
    const {user} = useSelector ((state)=>({...state}))

  
  return  user.user && user.user.token ? children : <LoadingToRediract/>
   
  
}

export default UserRoute
