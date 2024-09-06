/* eslint-disable react/prop-types */
import { Label } from "@radix-ui/react-label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import ProductImageUpload from "./imageUpload";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllPost } from "@/Redux/postSlice";

// npx shadcn@latest add select

function CreateProducts({ open, setOpen }) {
  const [imageFile, setImageFile] = useState();
  const [imageUrl, setImageurl] = useState("");
  const [fromdata, setFromdata] = useState({
    title: "",
    description: "",
    image: imageUrl,
    category: "",
    brand: "",
    price: 0,
    saleprice: 0,
    totalstock: 0,
  });
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);

  useEffect(() => {
    if (imageFile !== null) {
      setFromdata({ ...fromdata, image: imageUrl });
    }
  }, [imageUrl]);

  // console.log(fromdata);

  async function onsubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/products/create-post",
        fromdata,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(res.data.success);
      if (res.data.success) {
        toast.success(res.data.message);
        setImageFile(null);
        setFromdata({
          title: "",
          description: "",
          image: " ",
          category: "",
          brand: "",
          price: 0,
          saleprice: 0,
          totalstock: 0,
        });
        dispatch(setAllPost([res.data.data, ...post]));
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-96 overflow-y-scroll">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-1 mb-1">
                <h1 className="text-xl font-extrabold">Add New Products</h1>
              </SheetTitle>
            </SheetHeader>
            <form onSubmit={onsubmit} className="mt-2">
              <ProductImageUpload
                imageFile={imageFile}
                setImageFile={setImageFile}
                imageurl={imageUrl}
                setImageurl={setImageurl}
                fromdata={fromdata}
              />
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
                  <option value="man">Man</option>
                  <option value="woman">Woman</option>
                  <option value="kids">Kids</option>
                  <option value="accessrioes">Accessrioes</option>
                  <option value="footwear">Footwear</option>
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
                  <option value="nike">Nike</option>
                  <option value="addidas">Addidas</option>
                  <option value="puma">Puma</option>
                  <option value="levi's">Levis</option>
                  <option value="zara">Zara</option>
                  <option value="h&m">H&M</option>
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
              <Button as="button" oncClick={onsubmit} className="w-full">
                {" "}
                Add{" "}
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default CreateProducts;
