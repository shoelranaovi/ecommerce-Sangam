/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllPost } from "@/Redux/postSlice";

// eslint-disable-next-line react/prop-types
function UpladPost({ item }) {
  const { post } = useSelector((state) => state.post);
  const [fromdata, setFromdata] = useState({
    title: item.title || "",
    description: item.description || "",
    category: item.category || "",
    brand: item.brand || "",
    price: item.price || 0,
    saleprice: item.saleprice || 0,
    totalstock: item.totalstock || 0,
  });

  const dispatch = useDispatch();
  async function updatePost(e) {
    e.preventDefault();

    try {
      const res = await axios.patch(
        `http://localhost:3000/api/products/updatebpost/${item._id}`,
        fromdata,
        { withCredentials: true }
      );

      console.log(res);
      const updatepost = res.data.updateblog;
      if (res.data.success) {
        const updateposts = post.map((single) =>
          single._id === item._id ? { ...single, ...updatepost } : single
        );
        dispatch(setAllPost(updateposts));
        console.log(updateposts);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when {`you're`}{" "}
              done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={updatePost} className="mt-2">
            <div className="flex flex-col gap-1">
              <Label>Title</Label>
              <Input
                id="title"
                value={fromdata.title}
                onChange={(e) =>
                  setFromdata({ ...fromdata, [e.target.id]: e.target.value })
                }
                placeholder="Enter your product title"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Description</Label>
              <Input
                id="description"
                value={fromdata.description}
                onChange={(e) =>
                  setFromdata({ ...fromdata, [e.target.id]: e.target.value })
                }
                placeholder="Enter your product title"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Category</Label>
              <select
                id="category"
                onChange={(e) =>
                  setFromdata({ ...fromdata, [e.target.id]: e.target.value })
                }
                value={fromdata.category}
                className="bg-slate-100 h-8 border-2 pl-2">
                <option value="">Choose a category</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <Label>Brand</Label>
              <select
                id="brand"
                onChange={(e) =>
                  setFromdata({ ...fromdata, [e.target.id]: e.target.value })
                }
                value={fromdata.brand}
                className="bg-slate-100 h-8 border-2 pl-2">
                <option value="">Choose a brand</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <Label>Price</Label>
              <Input
                id="price"
                value={fromdata.price}
                onChange={(e) =>
                  setFromdata({ ...fromdata, [e.target.id]: e.target.value })
                }
                type="number"
                placeholder="Enter your product price"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Sale Price</Label>
              <Input
                id="saleprice"
                value={fromdata.saleprice}
                onChange={(e) =>
                  setFromdata({ ...fromdata, [e.target.id]: e.target.value })
                }
                type="number"
                placeholder="Enter your product sale price"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Total Stock</Label>
              <Input
                id="totalstock"
                value={fromdata.totalstock}
                onChange={(e) =>
                  setFromdata({ ...fromdata, [e.target.id]: e.target.value })
                }
                type="number"
                placeholder="Enter your product total stock"
              />
            </div>
            <Button as="button" oncClick={updatePost} className="w-full">
              {" "}
              Update Post{" "}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpladPost;
