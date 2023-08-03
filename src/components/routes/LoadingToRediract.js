import React, { useEffect, useState } from 'react'
import{useNavigate} from 'react-router-dom'
const LoadingToRediract = () => {
    const navigate = useNavigate()
    const [count,setCount] = useState(3)
  
    useEffect(()=>{
        
            const interval = setInterval(()=>{
                setCount((currentCount)=>--currentCount)
            },1000)
            count === 0 && navigate('/')

            return ()=> clearInterval(interval)
            // eslint-disable-next-line
    },[count])
  return (
      
    <div>
    <h1>No Permission , rediracvt in {count}</h1>
    </div>
  )
}

export default LoadingToRediract
