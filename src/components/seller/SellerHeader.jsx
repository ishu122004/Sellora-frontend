import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { Link } from "react-router-dom";
import { useState } from "react";

function SellerHeader({ user }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-4 md:px-6">

        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Sellora
          </h1>
          <p className="text-xs text-purple-600 font-medium">
            Seller Panel
          </p>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-5 text-sm">
          <li>
            <Link to="/seller" className="hover:text-purple-600">
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/seller/products" className="hover:text-purple-600">
              My Products
            </Link>
          </li>

          <li>
            <Link to="/seller/products/add" className="hover:text-purple-600">
              Add Product
            </Link>
          </li>

          <li>
            <Link to="/seller/orders" className="hover:text-purple-600">
              Orders
            </Link>
          </li>

          <li>
            <Link to="/seller/sales" className="hover:text-purple-600">
              Sales
            </Link>
          </li>

          <li>
            <Link to="/seller/reviews" className="hover:text-purple-600">
              Reviews
            </Link>
          </li>

          <li>
            <Link to="/seller/profile" className="hover:text-purple-600">
              Profile
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">

          {/* Email - Desktop */}
          <span className="hidden lg:block text-sm text-gray-600">
            {user?.email}
          </span>

          {/* Logout - Desktop */}
          <button
            onClick={handleLogout}
            className="hidden md:block bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-600"
          >
            Logout
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-2xl text-gray-900"
          >
            ☰
          </button>

        </div>
      </header>

      {/* Mobile Sidebar */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">

          {/* Background */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Sidebar */}
          <aside className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl p-6">

            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-bold text-lg">Seller Menu</h2>
                <p className="text-xs text-purple-600">
                  Sellora
                </p>
              </div>

              <button
                onClick={() => setMenuOpen(false)}
                className="text-xl"
              >
                ✕
              </button>
            </div>

            <ul className="space-y-2">

              <li>
                <Link
                  to="/seller"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg hover:bg-purple-50"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  to="/seller/products"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg hover:bg-purple-50"
                >
                  My Products
                </Link>
              </li>

              <li>
                <Link
                  to="/seller/products/add"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg hover:bg-purple-50"
                >
                  Add Product
                </Link>
              </li>

              <li>
                <Link
                  to="/seller/orders"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg hover:bg-purple-50"
                >
                  Orders
                </Link>
              </li>

              <li>
                <Link
                  to="/seller/sales"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg hover:bg-purple-50"
                >
                  Sales
                </Link>
              </li>

              <li>
                <Link
                  to="/seller/reviews"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg hover:bg-purple-50"
                >
                  Reviews
                </Link>
              </li>

              <li>
                <Link
                  to="/seller/profile"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg hover:bg-purple-50"
                >
                  Profile
                </Link>
              </li>

            </ul>

            <div className="mt-8 border-t pt-5">
              <p className="text-sm text-gray-500 mb-3">
                {user?.email}
              </p>

              <button
                onClick={handleLogout}
                className="w-full bg-black text-white px-4 py-3 rounded-lg text-sm hover:bg-purple-600"
              >
                Logout
              </button>
            </div>

          </aside>
        </div>
      )}
    </>
  );
}

export default SellerHeader;