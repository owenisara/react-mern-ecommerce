import React from 'react'
import './App.css'
import{Routes,Route} from 'react-router-dom'
//Route
import UserRoute from './components/routes/UserRoute';
import AdminRoute from './components/routes/AdminRoute';

import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarCon from "./components/layout/NavbarCon";

//Page
import SingleProduct from './components/page/SingleProduct';
import Home from "./components/page/Home";
import Login from "./components/page/auth/Login";
import Register from "./components/page/auth/Register";

//admin page
import HomeAdmin from "./components/page/admin/HomeAdmin";
import ManageAdmin from './components/page/admin/ManageAdmin';
import CreateCategory from './components/page/admin/CreateCategory';
import CreateProduct from './components/page/admin/product/CreateProduct';
import UpdateProduct from './components/page/admin/product/UpdateProduct';

// user Page
import History from './components/page/user/History';
//Function
import{currentUser} from './components/function/auth'
import { useDispatch } from 'react-redux';
import { loginUser } from './components/store/Reducer'
import Shop from './components/page/admin/Shop';
import Cart from './components/page/Cart';
import CheckOut from './components/page/CheckOut';
import OrderAdmin from './components/page/admin/OrderAdmin';

function App() {
const dispatch = useDispatch()
const idtoken = localStorage.token
 if(idtoken){
  currentUser(idtoken)
  .then(res=>{
    dispatch(loginUser({token:idtoken,
      email:res.data.email,
      role: res.data.role}))
    // console.log(res.data)
  }).catch(err=>{
    console.log(err)
  })
 }
  return (
    <div className="App">
      <NavbarCon/>
      <Routes>
         <Route path="/" element={<Home/>}></Route>
         <Route path="/product/:id" element={<SingleProduct/>}></Route>
          <Route path="/shop" element={<Shop/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          {/* /Admin/ */}
          <Route path="/admin/index" element={<AdminRoute><HomeAdmin/></AdminRoute>}></Route>
          <Route path="/admin/manage-admin" element={<AdminRoute><ManageAdmin/></AdminRoute>}></Route>
          <Route path="/admin/create-category" element={<AdminRoute><CreateCategory/></AdminRoute>}></Route>
          <Route path="/admin/create-product" element={<AdminRoute><CreateProduct/></AdminRoute>}></Route>
          <Route path="/admin/update-product/:id" element={<AdminRoute><UpdateProduct/></AdminRoute>}></Route>
          <Route path="/admin/orders" element={<AdminRoute><OrderAdmin/></AdminRoute>}></Route>
             {/* /User/ */}
          <Route path="/checkout" element={<UserRoute><CheckOut/></UserRoute>}></Route>
          <Route path="/history" element={<UserRoute><History/></UserRoute>}></Route>
      </Routes>
    </div>
  );
}

export default App;
