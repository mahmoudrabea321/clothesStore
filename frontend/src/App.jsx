import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./component/navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import CartPage from "./pages/cartPage.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import DashboardPage from "./pages/Dashboard.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import PurchaseSuccess from "./pages/purchaseSuccess.jsx";
import PurchaseCancel from "./pages/PurchaseCancel.jsx";
import Logout from "./pages/logout.jsx";
import useUserStore from "./lib/useUserStore.jsx";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  const { user, isAuthenticated } = useUserStore();

  useEffect(() => {
    useUserStore.getState().checkAuth();
  }, []);

  return (
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 -z-10">
            <div className="h-full w-full bg-slate-950"> 
            <div className="absolute top-[-10%] left-[-20%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
        </div>
      </div>

      <Navbar />
      <Toaster position="top-center" />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/cart"
          element={isAuthenticated ? <CartPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
        />

        <Route
          path="/signup"
          element={!isAuthenticated ? <Signup /> : <Navigate to="/" />}
        />

        <Route
          path="/dashboard"
          element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />}
        />

        <Route path="/logout" element={<Logout />} />
        <Route path="/categories/:category" element={<CategoryPage />} />
        <Route path="/success" element={<PurchaseSuccess />} />
        <Route path="/cancel" element={<PurchaseCancel />} />

      </Routes>
    </div>
  );
}

export default App;
