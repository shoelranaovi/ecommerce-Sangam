import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CartitemView from "@/components/Shipping-view/CartitemView";
import ShippingFrom from "@/components/Shipping-view/Address/ShoppingFrom";

function ShoppingCheckout() {
  const { cart } = useSelector((state) => state.cart);
  const naigate = useNavigate();
  const total =
    cart && cart.length > 0
      ? cart.reduce((sum, currentItem) => {
          const salePrice = currentItem.price;
          const quantity = currentItem.quantity;
          return sum + salePrice * quantity;
        }, 0)
      : 0;
  return (
    <div className="flex w-full">
      <div className="w-2/3">
        <ShippingFrom />
      </div>
      <div className="w-1/3">
        <div className="flex flex-col h-[80vh]  justify-between gap-4">
          <div>
            {cart?.map((item, i) => (
              <CartitemView key={i} item={item} />
            ))}
          </div>
          <div>
            <div>Total : {total} </div>
            <Button
              className="w-full"
              onClick={() => {
                naigate("/shopping/checkOut");
              }}>
              {" "}
              pay with Paypal{" "}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
