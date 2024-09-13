/* eslint-disable react/prop-types */

import { addtocart } from "@/Redux/AddtoCart";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Button } from "../ui/button";
import axios from "axios";

// eslint-disable-next-line no-unused-vars
function Cartproduct({ item, setOpen }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  async function addstocart() {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/cart/addtocart",
        {
          userId: user.id,
          productId: item._id,
          quantity: 1,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        console.log(res.data.data);

        dispatch(addtocart(res.data.data));
      } else {
        toast.error(res.data.message);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-[300px] h-[400px] flex flex-grow  justify-center items-center  bg-slate-200">
      <Card className="w-full">
        <CardHeader>
          <img
            onClick={setOpen}
            className=" bg-cover bg-center h-[200px]"
            src={item.image}
            alt=""
          />
          <span className="">{item.title} </span>
        </CardHeader>
        <CardContent className="flex justify-between font-bold">
          <span className="line-through">$200</span>
          <span>$100</span>
        </CardContent>
        <CardFooter className="flex justify-between ">
          <div>{item.price}</div> <div>{item.category}</div>{" "}
          <div>{item.brand}</div>
        </CardFooter>
        <Button className="w-full" onClick={addstocart}>
          Add to cart
        </Button>
      </Card>
    </div>
  );
}

export default Cartproduct;
