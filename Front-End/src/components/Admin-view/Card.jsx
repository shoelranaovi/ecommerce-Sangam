/* eslint-disable react/prop-types */
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllPost } from "@/Redux/postSlice";

import UpladPost from "../DeletePost";

function Cart({ item }) {
  const { post } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  async function postDeleteHandler(id) {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/products/deletepost/${id}`,
        { withCredentials: true }
      );
      console.log(res);
      const updatedpost = post.filter((item) => item._id !== id);
      console.log(updatedpost);
      dispatch(setAllPost(updatedpost));

      toast.success(res.data.message);
      alert(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <div className="w-[320px] h-[400px] flex flex-grow p-4  justify-center items-center  bg-slate-200">
      <Card className="w-full">
        <CardHeader>
          <img
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
          <Button className="w-20">
            {" "}
            <UpladPost item={item} />
            Edit{" "}
          </Button>
          <Button onClick={() => postDeleteHandler(item._id)} className="w-20">
            {" "}
            Delete{" "}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Cart;
