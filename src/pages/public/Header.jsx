//a page is a complete screen/route
//component =reusable part.page=complete screen
//home main homepagimport { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { useState } from "react";

function Header({ user }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setMenuOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const links = [
    ["/", "Home"],
    ["/products", "Products"],
    ["/orders", "My Orders"],
    ["/wishlist", "Wishlist"],
    ["/cart", "Cart"],
    ["/profile", "Profile"]
  ];

  return (
    <>
      <header className="sticky top-0 z-40 h-16 border-b border-gray-200 bg-white">
        <div className="flex h-full items-center justify-between px-4 md:px-6">
          <Link
            to="/"
            className="text-xl font-bold text-gray-900"
          >
           Sellora
          </Link>

          <ul className="hidden items-center gap-5 text-sm md:flex">
            {links.map(([path, name]) => (
              <li key={path}>
                <Link
                  to={path}
                  className="hover:text-purple-600"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-gray-600 lg:block">
              {user?.email}
            </span>

            {user ? (
              <button
                onClick={handleLogout}
                className="hidden rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-purple-600 md:block"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="hidden rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-purple-600 md:block"
              >
                Login
              </Link>
            )}

            <button
              onClick={() => setMenuOpen(true)}
              className="text-2xl md:hidden"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />

          <aside className="absolute right-0 top-0 h-full w-72 bg-white p-6 shadow-xl">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-lg font-bold">Menu</h2>

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
                    className="block rounded-lg px-4 py-3 hover:bg-purple-50"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t pt-5">
              {user ? (
                <>
                  <p className="mb-3 text-sm text-gray-500">
                    {user.email}
                  </p>

                  <button
                    onClick={handleLogout}
                    className="w-full rounded-lg bg-black px-4 py-3 text-white hover:bg-purple-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg bg-black px-4 py-3 text-center text-white hover:bg-purple-600"
                >
                  Login
                </Link>
              )}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

export default Header;