//seller dashboard navigation
import { Link } from "react-router-dom";

function SellerSidebar({ menuOpen, setMenuOpen }) {
  const links = [
    ["/seller", "Dashboard"],
    ["/seller/products", "My Products"],
    ["/seller/products/add", "Add Product"],
    ["/seller/orders", "Orders"],
    ["/seller/sales", "Sales"]
  ];

  return (
    <aside className={`fixed right-0 top-0 bottom-0 z-50 w-72 bg-black text-white p-5 transform transition-transform duration-300 md:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">
          Seller
        </h2>

        <button
          onClick={() => setMenuOpen(false)}
          className="text-xl"
        >
          ✕
        </button>
      </div>

      <nav className="space-y-2">
        {links.map(([path, name]) => (
          <Link
            key={path}
            to={path}
            onClick={() => setMenuOpen(false)}
            className="block px-4 py-3 rounded-lg hover:bg-purple-600"
          >
            {name}
          </Link>
        ))}
      </nav>

    </aside>
  );
}

export default SellerSidebar;