import { AlignRight, Home, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { addtocart } from "@/Redux/AddtoCart";
import Cartview from "./Cartview";

const menuItem = [
  {
    id: "home",
    path: "/shopping/listing",
    text: "Home",
  },
  {
    id: "men",
    path: "/shopping/listing",
    text: "Men",
  },
  {
    id: "women",
    path: "/shopping/listing",
    text: "Women",
  },
  {
    id: "kids",
    path: "/shopping/listing",
    text: "FootWear",
  },
  {
    id: "accessories",
    path: "/shopping/listing",
    text: "Accessories",
  },
];

function Navitem() {
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  async function fetchCart(id) {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/cart/fetchcart/${id}`
      );
      if (res.data.success) {
        dispatch(addtocart(res.data?.data.items));
      } else {
        dispatch(addtocart(null));
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchCart(user.id);
  }, []);
  return (
    <div className=" flex text-xl gap-4 flex-col justify-start lg:flex-row ">
      {menuItem.map((item, i) => (
        <Link key={i} to={item.path}>
          {" "}
          {item.text}{" "}
        </Link>
      ))}
    </div>
  );
}

function ShoppingHeader() {
  const [open, setOpen] = useState(false);
  const [opencart, setOpencart] = useState(false);
  return (
    <div className=" flex justify-between items-center w-full  px-8 py-4 ">
      <div className="flex item-center justify-center gap-4">
        <Home size={30} />
        <span className="font-bold text-xl">E-Commerce</span>
      </div>{" "}
      <div className="flex justify-center items-center">
        <div className=" hidden lg:flex h-7  justify-center items-center">
          <Navitem />
        </div>
        <Sheet className="lg:hidden">
          <SheetTrigger>
            <Button veriant="ghost" className=" lg:hidden p-2">
              <AlignRight size={35} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Navitem />
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden lg:flex relative">
        {" "}
        <div className="flex justify-center items-center gap-4">
          <ShoppingCart onClick={() => setOpencart(true)} />
          <span
            onClick={() => setOpen(!open)}
            className="bg-black cursor-pointer  p-2 rounded-full text-white">
            CN
          </span>
          {open ? (
            <div className="absolute bg-slate-300 duration-300 w-52 top-12  p-2 right-2">
              <div>Profile</div>
              <div>LogOut</div>
              <div>Cart</div>
            </div>
          ) : null}
        </div>
        <Cartview open={opencart} setOpen={setOpencart} />
      </div>
    </div>
  );
}

export default ShoppingHeader;
