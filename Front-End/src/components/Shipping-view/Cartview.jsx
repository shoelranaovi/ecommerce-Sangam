/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Sheet, SheetContent } from "../ui/sheet";
import CartitemView from "./CartitemView";

function Cartview({ open, setOpen }) {
  const { cart } = useSelector((state) => state.cart);

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="flex flex-col gap-4" side="right">
          {cart.map((item, i) => (
            <CartitemView key={i} item={item} />
          ))}
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Cartview;
