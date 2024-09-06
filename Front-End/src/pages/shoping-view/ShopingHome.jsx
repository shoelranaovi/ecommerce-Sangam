import ShoppingHeader from "@/components/Shipping-view/ShoppingHeader";

import { Outlet } from "react-router-dom";

function ShopingHome() {
  return (
    <div>
      <ShoppingHeader />
      <Outlet />
    </div>
  );
}

export default ShopingHome;
