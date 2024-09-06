import { useState } from "react";
import { Button } from "../ui/button";
import CreateProducts from "./CreateProducts ";

import { useSelector } from "react-redux";
import useGetAllpost from "@/hook/getAllPost";
import Cart from "./Card";

function Product() {
  useGetAllpost();
  const [open, setOpen] = useState(false);

  const { post } = useSelector((state) => state.post);

  return (
    <div className="w-full  p-4 m-4">
      <div className="flex w-full justify-end ">
        <Button onClick={() => setOpen(true)}>Add a New Post </Button>
      </div>
      <CreateProducts open={open} setOpen={setOpen} />
      <div className="flex flex-wrap w-full  gap-4  mt-6 bg-slate-500 ">
        {post?.map((item, i) => {
          return <Cart key={i} item={item} />;
        })}{" "}
      </div>
    </div>
  );
}

export default Product;
