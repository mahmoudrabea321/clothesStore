import useUserStore from "../lib/useUserStore.jsx";
import useCartStore from "../lib/useCartStore.js";

import {
  ShoppingCartIcon,
  LogIn,
  UserPlusIcon,
  LogOutIcon,
  UserIcon,
  LayoutDashboardIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user , logout } = useUserStore();
  const admin = true;  // admin?

  const { cart } = useCartStore();



  return (
    <nav className="w-full bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          e-store
        </Link>

        {/* Center Links */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-black">
            Home
          </Link>

          {user && (
            <Link
              to="/cart"
              className="flex items-center gap-1 text-gray-600 hover:text-black"
            >
              <ShoppingCartIcon size={18} />
              <span>Cart</span>
              {/* You can add a badge for cart items count here */}
                <span className="ml-1 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  {cart.length}
                </span>
            </Link>
          )}

          {admin && (
            <Link
              to="/dashboard"
              className="flex items-center gap-1 text-gray-600 hover:text-black"
            >
              <LayoutDashboardIcon size={18} />
              <span>Dashboard</span>
            </Link>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <>

              <Link
                to="/logout"
                className="flex items-center gap-1 text-red-600 hover:text-red-800"
                onClick={logout}
              >
                <LogOutIcon size={18} />
                <span>Logout</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-1 text-gray-600 hover:text-black"
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>

              <Link
                to="/signup"
                className="flex items-center gap-1 text-gray-600 hover:text-black"
              >
                <UserPlusIcon size={18} />
                <span>Sign Up</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
