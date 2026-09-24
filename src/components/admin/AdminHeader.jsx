import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { Link } from "react-router-dom";
import { useState } from "react";

function AdminHeader({ user }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.message);
    }
  };

  const links = [
    ["/admin", "Dashboard"],
    ["/admin/users", "Users"],
    ["/admin/products", "Products"],
    ["/admin/orders", "Orders"],
    ["/admin/sellers", "Sellers"],
    ["/admin/reviews", "Reviews"]
  ];

  return (
    <>
      <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-4 md:px-6">

        <div>
          <h1 className="text-xl font-bold text-gray-900">MarketHub</h1>
          <p className="text-xs text-purple-600 font-medium">Admin Panel</p>
        </div>

        <ul className="hidden md:flex items-center gap-5 text-sm">
          {links.map(([path, name]) => (
            <li key={path}>
              <Link to={path} className="hover:text-purple-600">
                {name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <span className="hidden lg:block text-sm text-gray-600">
            {user?.email}
          </span>

          <button
            onClick={handleLogout}
            className="hidden md:block bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-600"
          >
            Logout
          </button>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />

          <aside className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl p-6">

            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="font-bold text-lg">Admin Menu</h2>
                <p className="text-xs text-purple-600">MarketHub</p>
              </div>

              <button
                onClick={() => setMenuOpen(false)}
                className="text-xl"
              >
                ✕
              </button>
            </div>

            <ul className="space-y-2">
              {links.map(([path, name]) => (
                <li key={path}>
                  <Link
                    to={path}
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg hover:bg-purple-50"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t pt-5">
              <p className="text-sm text-gray-500 mb-3">
                {user?.email}
              </p>

              <button
                onClick={handleLogout}
                className="w-full bg-black text-white px-4 py-3 rounded-lg hover:bg-purple-600"
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

export default AdminHeader;