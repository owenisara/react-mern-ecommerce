import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    text:""
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
        searchQuery:(state,action)=>{
        state.text = action.payload
        }
  }
})

// Action creators are generated for each case reducer function
export const {searchQuery } = searchSlice.actions
export default searchSlice.reducer