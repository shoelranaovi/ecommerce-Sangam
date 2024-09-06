import { AlignRight, Home, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

import { useState } from "react";

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
          <ShoppingCart />
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
      </div>
    </div>
  );
}

export default ShoppingHeader;
