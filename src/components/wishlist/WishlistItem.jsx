import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFromWishlist } from "../../redux/slices/wishlistSlice";
import SafeImage from "../common/SafeImage";
import formatPrice from "../../utils/formatPrice";

function WishlistItem({ product }) {
  const dispatch = useDispatch();
  const image = product.images?.[0] || product.image;

  return (
    <article className="rounded-xl border bg-white p-4">
      <SafeImage src={image} alt={product.name} className="h-48 w-full rounded-lg object-cover" />
      <h2 className="mt-4 font-semibold">{product.name}</h2>
      <p className="mt-2 font-bold">{formatPrice(product.price)}</p>
      <div className="mt-4 flex gap-3">
        <Link to={`/product/${product._id}`} className="rounded-lg bg-black px-4 py-2 text-sm text-white">View</Link>
        <button type="button" onClick={() => dispatch(removeFromWishlist({ productId: product._id }))} className="rounded-lg border px-4 py-2 text-sm text-red-600">Remove</button>
      </div>
    </article>
  );
}

export default WishlistItem;
