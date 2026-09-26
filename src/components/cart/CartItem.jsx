import { useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../../redux/slices/cartSlice";
import SafeImage from "../common/SafeImage";
import formatPrice from "../../utils/formatPrice";

function CartItem({ item }) {
  const dispatch = useDispatch();
  const image = item.images?.[0] || item.image;

  return (
    <article className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4">
      <SafeImage src={image} alt={item.name} className="h-24 w-24 rounded-lg object-cover" />
      <div className="flex-1">
        <h2 className="font-semibold">{item.name}</h2>
        <p className="mt-1 text-gray-500">{formatPrice(item.price)}</p>
        <div className="mt-4 flex items-center gap-3">
          <button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => dispatch(decreaseQuantity(item._id))} className="h-8 w-8 rounded border">-</button>
          <span>{item.quantity}</span>
          <button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => dispatch(increaseQuantity(item._id))} className="h-8 w-8 rounded border">+</button>
          <button type="button" onClick={() => dispatch(removeFromCart(item._id))} className="ml-4 text-sm text-red-600">Remove</button>
        </div>
      </div>
      <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
    </article>
  );
}

export default CartItem;
