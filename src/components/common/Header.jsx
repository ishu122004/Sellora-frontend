import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { Link } from "react-router-dom";
function Header({user}) {
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">MarketHub</h1>

        {user?<button
          onClick={handleLogout}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
        >
          Logout
        </button>:  <Link
            to="/login"
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
          >
            Login
          </Link>}
      </nav>
    </header>
  );
}

export default Header;