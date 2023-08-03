import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Reducer'
import searchSlice from './SearchSlice'
import  cartSlice  from './Cart'
export const store = configureStore({
  reducer: {
    user:userSlice,
    search:searchSlice,
    cart:cartSlice
  },
})