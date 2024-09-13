import DialogPost from "@/components/Shipping-view/DialogPost";
import Cartproduct from "@/components/Shipping-view/productCard";
import Slider from "@/components/Shipping-view/Slider";
import { Card } from "@/components/ui/card";
import { setAllPost } from "@/Redux/postSlice";
import axios from "axios";
import {
  BabyIcon,
  CloudLightning,
  ShirtIcon,
  UmbrellaIcon,
  WatchIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { useNavigate, useSearchParams } from "react-router-dom";

const categoriesWithIcon = [
  { id: "man", label: "Men", icon: ShirtIcon },
  { id: "woman", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessrioes", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

function ShopingHome() {
  const dispatch = useDispatch();
  const [post, setPost] = useState([]);
  const [open, setIsOpen] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

  const navigate = useNavigate();
  const handleOpen = () => setIsOpen(true);

  async function fetchProduct() {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/products/getallshopost`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setPost(res.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(setAllPost(null));
    }
  }
  useEffect(() => {
    fetchProduct();
  }, []);

  function handleFilters(getsessionid, getcurrentfilter) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [getsessionid]: [getcurrentfilter],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shopping/listing");
  }

  return (
    <div>
      <div>
        <Slider />
      </div>
      <div className="flex mt-4 flex-col w-full justify-center items-center">
        <h1 className="font-bold text-3xl">Shop by Category</h1>
      </div>
      <div className="flex justify-center items-center gap-4 mt-10 flex-wrap">
        {categoriesWithIcon.map((category, i) => (
          <Card
            key={i}
            onClick={() => handleFilters("category", category.id)}
            className="w-36 cursor-pointer flex flex-col p-6 justify-center items-center gap">
            <div>
              <category.icon className="w-6 h-6" />
            </div>
            <span>{category.label}</span>
          </Card>
        ))}
      </div>
      <div className=" bg-slate-500 gap-4  mt-5 justify-center flex w-full flex-wrap">
        {post?.map((item, i) => (
          <div
            key={i}
            onClick={() => {
              setProductDetails(item);
            }}>
            <Cartproduct setOpen={setIsOpen} item={item} />{" "}
          </div>
        ))}
      </div>
      <DialogPost open={open} setOpen={setIsOpen} item={productDetails} />
    </div>
  );
}

export default ShopingHome;
