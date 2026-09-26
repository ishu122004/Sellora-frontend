import SafeImage from "../common/SafeImage";
import formatPrice from "../../utils/formatPrice";

function OrderItem({ item }) {
  return (
    <div className="flex items-center gap-4 border-b py-4">
      <SafeImage src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-gray-500">{formatPrice(item.price)} x {item.quantity}</p>
      </div>
      <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
    </div>
  );
}

export default OrderItem;
