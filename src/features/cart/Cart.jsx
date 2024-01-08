
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useSelector,useDispatch } from 'react-redux';
import { clearCart } from "./castSlice";


function Cart() {
  const cart = useSelector((state)=>state.cart.cart); //We can use a getter function here as well so that we can make this function in cartSlice.
  const dispatch = useDispatch();
  const username = useSelector((store)=>store.user.username); 

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
    <div className="py-3 px-4">
      <LinkButton to="/menu" >&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

<ul className="divide-y divide-stone-200 border-b mt-3">

  {cart.map((item)=>(
    <CartItem item={item} key={item.pizzaId}/> 
  ))}
</ul>
      <div className="mt-6 space-x-2">
        <Button to="/order/new" type="primary">Order Pizzas</Button>
        <Button type="secondary" onClick={()=>dispatch(clearCart())}>Clear Cart</Button>
      </div>
    </div>
  );
}

export default Cart;
