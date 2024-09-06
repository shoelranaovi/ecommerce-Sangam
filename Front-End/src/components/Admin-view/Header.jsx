/* eslint-disable react/prop-types */
import { ChartNoAxesCombined, ListCollapse, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setuserdetailfail } from "@/Redux/AuthSlice";
import { setAllPost } from "@/Redux/postSlice";

function Header({ open, setOpen }) {
  const dispatch = useDispatch();
  console.log(open);
  async function authLogout() {
    try {
      const res = await axios.get("http://localhost:3000/api/auth/logout", {
        withCredentials: true,
      });
      console.log(res);
      toast.success(res.data.message);
      dispatch(setuserdetailfail(null));
      dispatch(setAllPost(null));
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <div className="flex justify-between p-4 bg-slate-100">
      <div className="flex  gap-2 items-center justify-center">
        <div className="lg:flex gap-2 hidden">
          <ChartNoAxesCombined />
          <span className="font-bold">Admim pannel</span>
        </div>
        <div className=" lg:hidden">
          <Button onClick={() => setOpen(true)} className="px-4 py-3">
            <ListCollapse size={20} />
          </Button>
        </div>
      </div>
      <Button onClick={authLogout} className="px-4 py-3">
        {" "}
        <span className="mr-2">Log Out </span>
        <LogOut size={20} />
      </Button>
    </div>
  );
}

export default Header;
