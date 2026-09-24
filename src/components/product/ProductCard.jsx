//display one product card
// const ProductCard=({product})=>{
//     return(
//       <article>
//         <img src={product.image} alt={product.name}/>
//         <h2>{product.name}</h2>
//         <p>{product.desccription}</p>
//         <p>₹{product.price}</p>
//         <p>{product.category}</p>
//       </article>
//     )
// }
// export default ProductCard
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <p className="text-xs font-medium uppercase text-purple-600">
          {product.category}
        </p>

        <h2 className="mt-2 text-lg font-semibold text-gray-900">
          {product.name}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm text-gray-500">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-xl font-bold">
            ₹{product.price}
          </p>

          <Link
            to={`/product/${product._id}`}
            className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-purple-600"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;