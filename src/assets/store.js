import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./../features/user/userSlice"
import cartReducer from "./../features/cart/castSlice"
export const  store = configureStore({
  reducer: {
    user:userReducer,
    cart:cartReducer,
  },
})