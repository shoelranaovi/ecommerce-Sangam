/* eslint-disable react/prop-types */
import {
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenu } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ArrowDownUpIcon } from "lucide-react";

import { useSelector } from "react-redux";

import Cartproduct from "./productCard";
import DialogPost from "./DialogPost";
import { useState } from "react";
// import Cartproduct from "./productCard";

const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];
function ListingMain({ sort, setSort }) {
  console.log(sort);
  const [open, setOpen] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

  const { post } = useSelector((state) => state.post);

  function handlesortchange(event) {
    setSort(event);
  }

  return (
    <div className="w-full   px-4 flex flex-col">
      <div className="w-full bg-slate-100 flex justify-between items-center ">
        <div>All Products</div>
        <div className="flex gap-4 justify-center items-center">
          <sapn> 10 products</sapn>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">
                {" "}
                <ArrowDownUpIcon /> Sort by
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px] bg-slate-100 p-2 ">
              <DropdownMenuRadioGroup
                value={sort}
                onValueChange={handlesortchange}
                className="flex flex-col gap-2">
                {sortOptions.map((item, i) => (
                  <DropdownMenuRadioItem value={item?.id} key={i}>
                    {" "}
                    {item?.label}{" "}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className=" bg-slate-500 gap-4  mt-5 justify-center flex w-full flex-wrap">
        {post?.map((item, i) => (
          <div
            onClick={() => {
              setOpen(true);
              setProductDetails(item);
            }}
            key={i}>
            <Cartproduct item={item} />{" "}
          </div>
        ))}
      </div>
      <DialogPost open={open} setOpen={setOpen} item={productDetails} />
    </div>
  );
}

export default ListingMain;
