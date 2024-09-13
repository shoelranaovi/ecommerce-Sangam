/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { addtocart } from "@/Redux/AddtoCart";
import { AvatarIcon, StarFilledIcon } from "@radix-ui/react-icons";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function DialogPost({ open, setOpen, item }) {
  const { user } = useSelector((state) => state.auth);
  console.log(setOpen);

  const dispatch = useDispatch();

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className=" flex  max-w-5xl">
        <div className="w-4/6 h-full flex items-center mt-20 justify-center bg-slate-600  ">
          <img src={item?.image} className="bg-cover" />
        </div>
        <div className="w-2/4">
          <div className="flex flex-col   mt-5  gap-2">
            <span className="text-2xl font-bold">{item?.title} </span>
            <span className="text-xl ">{item?.title} </span>
            <div className="flex w-full bg-slate-500 justify-between">
              <span>$250</span>
              <span>$150</span>
            </div>
            <div className="flex">
              <StarFilledIcon className="w-5 h-5 text-black" />
              <StarFilledIcon className="w-5 h-5 text-black" />
              <StarFilledIcon className="w-5 h-5 text-black" />
              <StarFilledIcon className="w-5 h-5 text-black" />
              <StarFilledIcon className="w-5 h-5 text-black" />
              <span>(4.5) </span>
            </div>
            <Button onClick={addstocart}>Add to card</Button>
            <div className="w-full">
              <h1 className="font-bold text-2xl">Reviews</h1>
              <div className="mt-2 flex flex-col gap-2 h-[200px] overflow-y-scroll ">
                <div className="flex">
                  <AvatarIcon className="w-8 h-8" />
                  <div>
                    <h1>Sangam Mukergi</h1>
                    <div className="flex">
                      <StarFilledIcon className="w-5 h-5 text-black" />
                      <StarFilledIcon className="w-5 h-5 text-black" />
                      <StarFilledIcon className="w-5 h-5 text-black" />
                      <StarFilledIcon className="w-5 h-5 text-black" />
                      <StarFilledIcon className="w-5 h-5 text-black" />
                    </div>
                    <span>This is awesome Product</span>
                  </div>
                </div>
                <div className="flex">
                  <AvatarIcon className="w-8 h-8" />
                  <div>
                    <h1>Sangam Mukergi</h1>
                    <div className="flex">
                      <StarFilledIcon className="w-5 h-5 text-black" />
                      <StarFilledIcon className="w-5 h-5 text-black" />
                      <StarFilledIcon className="w-5 h-5 text-black" />
                      <StarFilledIcon className="w-5 h-5 text-black" />
                      <StarFilledIcon className="w-5 h-5 text-black" />
                    </div>
                    <span>This is awesome Product</span>
                  </div>
                </div>
                <div className="flex">
                  <AvatarIcon className="w-8 h-8" />
                  <div>
                    <h1>Sangam Mukergi</h1>
                    <div className="flex">
                      <StarFilledIcon className="w-5 h-5 text-black" />
                      <StarFilledIcon className="w-5 h-5 text-black" />
                      <StarFilledIcon className="w-5 h-5 text-black" />
                      <StarFilledIcon className="w-5 h-5 text-black" />
                      <StarFilledIcon className="w-5 h-5 text-black" />
                    </div>
                    <span>This is awesome Product</span>
                  </div>
                </div>
                <div className="flex">
                  <AvatarIcon className="w-8 h-8" />
                  <div>
                    <h1>Sangam Mukergi</h1>
                    <div className="flex">
                      <StarFilledIcon className="w-5 h-5 text-black" />
                      <StarFilledIcon className="w-5 h-5 text-black" />
                      <StarFilledIcon className="w-5 h-5 text-black" />
                      <StarFilledIcon className="w-5 h-5 text-black" />
                      <StarFilledIcon className="w-5 h-5 text-black" />
                    </div>
                    <span>This is awesome Product</span>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-between bg-slate-400">
                <input className="w-full " placeholder="Write a review" />{" "}
                <Button>Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DialogPost;
