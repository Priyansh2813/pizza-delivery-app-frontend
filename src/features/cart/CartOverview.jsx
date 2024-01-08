import { Link } from "react-router-dom";
import {useSelector} from "react-redux"
import { getTotalCartPrice, getTotalCartQuantity } from "./castSlice";
import { formatCurrency } from "../../utils/helpers";
function CartOverview() {

const totalQuantity = useSelector(getTotalCartQuantity );
const totalPrice = useSelector(getTotalCartPrice);

  const cart = useSelector((state)=>state.cart.cart);
  if(!cart.length){
    return null;
  }
  return (
    <div className="flex items-center justify-between bg-stone-800 text-stone-200 text-sm uppercase px-4 py-4 sm:px-6 md:text-base 
    ">
      <p className="text-stone-300 font-semibold space-x-4 sm:space-x-6">
        <span>{totalQuantity} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart"> Open cart &rarr;</Link>
    </div> 
  );
}

export default CartOverview;
