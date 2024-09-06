import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";

import Error from "./pages/Error";
import Login from "./pages/Auth/Login";
import AuthLayout from "./pages/Auth/AuthLayout";
import Resgister from "./pages/Auth/Resgister";
import AdminLayout from "./pages/admin/AdminLayout";
import Orders from "./pages/admin/Orders";
import Dashbord from "./pages/admin/Dashbord";

import Features from "./pages/admin/Features";
import ShopingHome from "./pages/shoping-view/ShopingHome";
import ShippingAccount from "./pages/shoping-view/ShippingAccount";
import ShippingListing from "./pages/shoping-view/ShippingListing";
import ShoppingCheckout from "./pages/shoping-view/ShoppingCheckout";
import AuthenticationRote from "./privateRoute";
import useCheckUser from "./hook/authCheck";
import Product from "./components/Admin-view/Product";
const route = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthenticationRote>
        <Home />
      </AuthenticationRote>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <AuthenticationRote>
        <AuthLayout />
      </AuthenticationRote>
    ),
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "register-user",
        element: <Resgister />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <AuthenticationRote>
        <AdminLayout />
      </AuthenticationRote>
    ),
    children: [
      {
        path: "",
        element: <Product />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "dashboard",
        element: <Dashbord />,
      },
      {
        path: "products",
        element: <Product />,
      },
      {
        path: "features",
        element: <Features />,
      },
    ],
  },
  {
    path: "shopping",
    element: (
      <AuthenticationRote>
        <ShopingHome />
      </AuthenticationRote>
    ),
    children: [
      {
        path: "",
        element: <ShippingAccount />,
      },
      {
        path: "account",
        element: <ShippingAccount />,
      },
      {
        path: "listing",
        element: <ShippingListing />,
      },
      {
        path: "checkOut",
        element: <ShoppingCheckout />,
      },
    ],
  },

  {
    path: "/*",
    element: <Error />,
  },
]);

function App() {
  useCheckUser();
  // useGetAllpost();
  return (
    <div>
      <RouterProvider router={route} />
    </div>
  );
}

export default App;
