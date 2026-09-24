import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-black text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <section>
          <h2 className="text-xl font-bold">
            Market<span className="text-purple-500">Hub</span>
          </h2>

          <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
            A multi-vendor marketplace connecting customers and independent
            sellers in one platform.
          </p>
        </section>

        <nav>
          <h2 className="font-semibold">Marketplace</h2>

          <ul className="mt-4 space-y-3 text-sm text-gray-400">
            <li>
              <Link to="/products" className="hover:text-white">
                Products
              </Link>
            </li>

            <li>
              <Link to="/categories" className="hover:text-white">
                Categories
              </Link>
            </li>

            <li>
              <Link to="/become-seller" className="hover:text-white">
                Become a Seller
              </Link>
            </li>
          </ul>
        </nav>

        <nav>
          <h2 className="font-semibold">Account</h2>

          <ul className="mt-4 space-y-3 text-sm text-gray-400">
            <li>
              <Link to="/profile" className="hover:text-white">
                Profile
              </Link>
            </li>

            <li>
              <Link to="/orders" className="hover:text-white">
                Orders
              </Link>
            </li>

            <li>
              <Link to="/wishlist" className="hover:text-white">
                Wishlist
              </Link>
            </li>
          </ul>
        </nav>

        <section>
          <h2 className="font-semibold">Contact</h2>

          <address className="mt-4 space-y-3 text-sm not-italic text-gray-400">
            <p>support@markethub.com</p>
            <p>+91 98765 43210</p>
          </address>
        </section>
      </div>

      <div className="border-t border-gray-800 px-4 py-5 text-center text-sm text-gray-500">
        © 2026 MarketHub. All rights reserved.
      </div>
    </footer>
  );
}