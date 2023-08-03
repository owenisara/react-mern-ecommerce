import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart:[]

    
}

if(typeof window !== "undefined"){
    if(localStorage.getItem('cart')){
        initialState.cart = JSON.parse(localStorage.getItem('cart'))
    }
}


export const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addtoCart: (state,action)=>{
            state.cart = action.payload
        },
        clearCart:(state)=>{
            state.cart = []
        }
        
    }
})

export const {addtoCart,clearCart } = cartSlice.actions

export default cartSlice.reducer