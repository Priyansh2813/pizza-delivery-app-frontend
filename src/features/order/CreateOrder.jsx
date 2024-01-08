/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { useState } from "react";

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getTotalCartPrice } from "../cart/castSlice";
import LinkButton from "../../ui/LinkButton";
import {store} from "./../../assets/store"
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );



function CreateOrder() {

  const dispatch = useDispatch();
   const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const cart = useSelector((state)=>state.cart.cart);
  const formErrors = useActionData();
  const totalCartprize = useSelector(getTotalCartPrice);
const priorityPrice= withPriority? totalCartprize*0.2 : 0;
  
  const totalPrice=totalCartprize + priorityPrice;
  const isSubmitting = navigation.submitting === "submitting";
  const user= useSelector((store)=>store.user);
  const{username , status:addressStatus,
  position,
address} =user; 
const isLoadingAddress = addressStatus==="loading";
  if(!cart.length){
    return(
      <div>
       <div className="mt-5"><LinkButton to="/menu">&larr; Back to menu</LinkButton></div> 
       <h1 className="mt-10 mb-8 text-stone-500 font-semibold text-xl"> Hi, {username} 👋</h1>
       <h3 className="text-yellow-600 mb-4">Why don&apos;t you try our delicious Pizzas.🍕 </h3>
       <h3 className="text-yellow-600 mb-4">You won&apos;t regret...😜</h3>
      </div>
    )
  }
  
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Lets go!</h2>

      <Form method="POST" action="/order/new">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row">
          <label className="sm:basis-40">First Name</label>
          <input  className="input grow" type="text" name="customer" defaultValue={username} required />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
      
          {formErrors?.phone && <p className="text-xs mt-2 text-red-700 bg-red-100  rounded-md px-2 py-1">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input type="text" name="address" required 
            className="input w-full" 
            defaultValue={address}
            disabled={isLoadingAddress}/>
          </div>
         {!position.latitude && !position.longitude &&  <span className="absolute right-[3px] pt-1"><Button disabled={isLoadingAddress} type="small" onClick={(e)=>{
            e.preventDefault();
            console.log("clicked");
            dispatch(fetchAddress())}}>Get Position</Button></span>}
        </div>

        <div className="mb-12 flex items-center gap-x-5 font-semibold">
          <input
            type="checkbox"
            name="priority"
            id="priority"
             value={withPriority}
             
             onChange={(e) => setWithPriority(e.target.checked)}
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2"
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={ position.longitude && position.longitude ? `${position.latitude}, ${position.longitude}` :""}/>
         <Button disabled={isSubmitting || isLoadingAddress} type="primary" > Order Now for {formatCurrency(totalPrice)} </Button> 
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};

  if (!isValidPhone(order.phone)) {
    errors.phone = "Please give us your number.";
  }

  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order);

  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
