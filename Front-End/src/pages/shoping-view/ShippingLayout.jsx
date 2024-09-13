import ShoppingHeader from "@/components/Shipping-view/ShoppingHeader";
import { Outlet } from "react-router-dom";

function ShippingLayout() {
  return (
    <div>
      <ShoppingHeader />
      <Outlet />
    </div>
  );
}

export default ShippingLayout;
