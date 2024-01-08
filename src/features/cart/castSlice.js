import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: [],
  }
  
  export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addItem(state,action){
        state.cart.push(action.payload);
      },
      deleteItem(state,action){
        state.cart = state.cart.filter((item)=> item.pizzaId!==action.payload);
      },
      clearCart(state){
        state.cart=[];
      },
      increaseItemQuatity(state,action){
        const item =state.cart.find((item)=> item.pizzaId===action.payload);
        item.quantity++;
        item.totalPrice = item.quantity*item.unitPrice;
      },
      decreaseItemQuantity(state,action){
        const item =state.cart.find((item)=> item.pizzaId===action.payload);
        item.quantity--;
        item.totalPrice = item.quantity*item.unitPrice;

        if(item.quantity===0){
          cartSlice.caseReducers.deleteItem(state,action);
        }
      },

    },
  })
  
  //These getter functions can be obtimized using "RESELECT" library of redux
  export const getTotalCartQuantity = (state)=>state.cart.cart.reduce((sum,item)=> (sum + item.quantity) , 0) ;

  export const getTotalCartPrice = (state)=>state.cart.cart.reduce((sum,item)=> (sum + item.totalPrice) , 0) ;

  export const getCurrentQuantityById = id =>state=>
    state.cart.cart.find(item=>item.pizzaId===id)?.quantity??0;
  
  // Action creators are generated for each case reducer function
  export const {addItem,deleteItem,decreaseItemQuantity,increaseItemQuatity,clearCart} = cartSlice.actions
  
  export default cartSlice.reducer;