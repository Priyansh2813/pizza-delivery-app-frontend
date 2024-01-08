/* eslint-disable react/prop-types */
import Button from "../../ui/Button"
import {useDispatch,useSelector} from "react-redux";
import { decreaseItemQuantity,getCurrentQuantityById,increaseItemQuatity } from "./castSlice";
function UpdateItemQuantity({pizzaId}) {
    const dispatch = useDispatch();
    const currentQuantity  = useSelector(getCurrentQuantityById(pizzaId));
    
  return (
    <div className="flex gap-1 items-center md:gap-4">
      <Button type="round" onClick={()=>dispatch(decreaseItemQuantity(pizzaId))}>-</Button>
      <span>{currentQuantity}</span>
      <Button type="round" onClick={()=>dispatch(increaseItemQuatity(pizzaId))}>+</Button>
    </div>
  )
}

export default UpdateItemQuantity
