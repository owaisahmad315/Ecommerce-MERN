// import { Navigate, useLocation } from "react-router-dom";

// function CheckAuth({ isAuthenticated, user, children }) {
//   const location = useLocation();

//   // If the user is not authenticated and is not on the login or register page, redirect to login
//   if (!isAuthenticated && !(location.pathname.includes("/login") || location.pathname.includes("/register"))) {
//     return <Navigate to="/auth/login" />;
//   }

//   // If the user is authenticated and visiting a restricted route, navigate to their respective dashboard
//   if (isAuthenticated) {
//     if (!location.pathname.includes("/login") && !location.pathname.includes("/register")) {
//       if (user?.role === 'admin') {
//         return <Navigate to='/admin/dashboard' />;
//       } else {
//         return <Navigate to='/shop/home' />;
//       }
//     }

//     // If the user is not an admin and tries to access an admin route
//     if (user?.role !== 'admin' && location.pathname.includes("/admin")) {
//       return <Navigate to='/unauth-page' />;
//     }

//     // If the user is not an admin and tries to access shop route (assuming this is a wrong condition)
//     if (user?.role !== 'admin' && location.pathname.includes("/shop")) {
//       return <Navigate to='/shop/home' />;
//     }
//   }

//   // Render children if no conditions apply
//   return <>{children}</>;
// }

// export default CheckAuth;








import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  console.log(location.pathname, isAuthenticated);

  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    }
  }

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}

export default CheckAuth;