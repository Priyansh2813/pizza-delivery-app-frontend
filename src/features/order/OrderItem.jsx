/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
          <span className="text-stone-500 text-sm capitalize italic">{ingredients.join(", ")}</span>
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
       
      </div>
    </li>
  );
}

export default OrderItem;
