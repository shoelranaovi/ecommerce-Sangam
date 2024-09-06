/* eslint-disable react-hooks/exhaustive-deps */

import { useSelector } from "react-redux";

import { useLocation, Navigate } from "react-router-dom";

function AuthenticationRote({ children }) {
  const { Auth, user } = useSelector((state) => state.auth);

  const location = useLocation();
  if (location.pathname === "/" || "") {
    if (!Auth) {
      return <Navigate to="/auth/login" />;
    } else {
      if (user?.role === "Admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shopping" />;
      }
    }
  }
  if (
    !Auth &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register-user")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }
  if (
    Auth &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register-user"))
  ) {
    if (user.role === "Admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shopping" />;
    }
  }

  if (Auth && user.role !== "Admin" && location.pathname.includes("/admin")) {
    return <Navigate to="/shopping" />;
  }
  if (
    (Auth &&
      user.role === "Admin" &&
      location.pathname.includes("/shopping")) ||
    location.pathname.includes("/home")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return children;
}

export default AuthenticationRote;
