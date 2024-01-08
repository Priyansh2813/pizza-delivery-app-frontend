/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Button from "../../ui/Button"
import { deleteItem } from "./castSlice"


import {useDispatch} from "react-redux";
function DeleteItem({pizzaId}) {

    const dispatch = useDispatch();
  return (
    <Button type="small" onClick={()=>dispatch(deleteItem(pizzaId))}>Delete</Button> 
  )
}

export default DeleteItem;
