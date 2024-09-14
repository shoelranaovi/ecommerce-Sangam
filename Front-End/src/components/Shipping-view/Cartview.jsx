/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Sheet, SheetContent } from "../ui/sheet";
import CartitemView from "./CartitemView";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

function Cartview({ open, setOpen }) {
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
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          className="flex flex-col  justify-between gap-4"
          side="right">
          <div>
            {cart?.map((item, i) => (
              <CartitemView key={i} item={item} />
            ))}
          </div>
          <div>
            totalprice:{total}
            <Button
              className="w-full"
              onClick={() => {
                naigate("/shopping/checkOut");
                setOpen(false);
              }}>
              {" "}
              CheckOut{" "}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Cartview;
