import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white/10 backdrop-blur-lg shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white drop-shadow-lg">
          SkillSwap
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6">
          <Link to="/" className="text-white hover:text-[#e2d64b]">Home</Link>

          {user ? (
            <>
              <Link to="/dashboard" className="text-white hover:text-[#e2d64b]">Dashboard</Link>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-[#e2d64b] text-white px-4 py-2 rounded-md hover:bg-[#c2c19f] transition-all">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
