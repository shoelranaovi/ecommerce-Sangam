import { setAllPost } from "@/Redux/postSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllpost = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const getAllpost = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/products/getallpost",
          {
            withCredentials: true,
          }
        );
        console.log(res);

        if (res.data.success) {
          if (user.role === "Admin") {
            dispatch(setAllPost(res.data.data));
          } else {
            dispatch(setAllPost(null));
          }
        }
        console.log(res.data?.data);
      } catch (error) {
        console.log(error);
        dispatch(setAllPost(null));
      }
    };
    getAllpost();
  }, []);
};

export default useGetAllpost;
