import { addtocart } from "@/Redux/AddtoCart";
import axios from "axios";
import { Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

/* eslint-disable react/prop-types */
function CartitemView({ item }) {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  async function updateqty(action) {
    let qty = item.quantity;
    if (action === "plus") {
      qty += 1;
    } else {
      qty -= 1;
    }
    try {
      const res = await axios.put(
        "http://localhost:3000/api/cart/updatecart",
        { userId: user.id, productId: item.productId, quantity: qty },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(addtocart(res.data.data.items));
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteCart() {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/cart/deletecart/${user.id}/${item.productId}`
      );
      console.log(res);

      dispatch(addtocart(res.data.data.items));
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex justify-between">
      <div className="flex gap-4">
        <img className="w-14" src={item.image} />
        <div>
          <span>{item.title} </span>
          <div>
            <button onClick={() => updateqty("minus")}>-</button>
            <span> {item.quantity} </span>
            <button onClick={() => updateqty("plus")}>+</button>
          </div>
        </div>
        <div className="cursor-pointer">
          <Trash onClick={deleteCart} />
        </div>
      </div>
      <span>${item.price * item.quantity}</span>
    </div>
  );
}

export default CartitemView;
