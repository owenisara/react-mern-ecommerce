import axios from 'axios'


export const register = async(value)=>
await axios.post(`${process.env.REACT_APP_API}/register`,value)

export const login = async(value)=>
await axios.post(`${process.env.REACT_APP_API}/login`,value)

export const currentUser = async(authtoken)=>{
    console.log('currentUser',authtoken)
    return await axios.post(`${process.env.REACT_APP_API}/curren-user`,{},
{
 headers:{
    authtoken,
 }
})}

export const currentAdmin = async(authtoken)=>{
    console.log('currentAdmin',authtoken)
    return await axios.post(`${process.env.REACT_APP_API}/curren-admin`,{},
{
 headers:{
    authtoken,
 }
})}