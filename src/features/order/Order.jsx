/* eslint-disable react-refresh/only-export-components */
// Test ID: IIDSAT

import { getOrder } from "../../services/apiRestaurant";

import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { useFetcher, useLoaderData } from "react-router-dom";
import OrderItem from "./OrderItem";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const order = useLoaderData();
  const { id ,status, priority , priorityPrice, orderPrice, estimatedDelivery , cart} =
    order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  const fetcher = useFetcher();

  useEffect(function(){
    if(!fetcher.data && fetcher.state==="idle")
    fetcher.load("/menu");
  },[fetcher]);
  return (
    <div className="px-4 py-6 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && <span className="bg-red-500 rounded-full text-sm px-3 py-1 uppercase text-red-50 tracking-wide">Priority</span>}
          <span className="bg-green-500 rounded-full text-sm px-3 py-1 uppercase text-green-50 tracking-wide">{status} order</span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>
            <ul className="divide-y dive-stone-200 border-b border-t">

            {cart.map((item)=>(
              <OrderItem key={item.pizzaId} ingredients={fetcher?.data?.find((el)=>el.id===item.pizzaId)?.ingredients ?? []} item={item}/>
            ))}

            </ul>
      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>

      {!priority && <UpdateOrder order={order}>Create this Order Priority</UpdateOrder>}
    </div>
  );
}

export async function loader({ params }) {

  const order = await getOrder(params.id);

  return order;
}

export default Order;
