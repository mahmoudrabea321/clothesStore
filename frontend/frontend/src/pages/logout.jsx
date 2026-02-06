import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useUserStore from "../lib/useUserStore.jsx";

function Logout() {
  const logout = useUserStore((state) => state.logout);

  useEffect(() => {
    logout();
  }, []);

  return <Navigate to="/" replace />;
}

export default Logout;
