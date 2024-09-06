import { setuserdetail, setuserdetailfail } from "@/Redux/AuthSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useCheckUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/auth/checkuser",
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setuserdetail(res.data?.data));
        }
        console.log(res.data?.data);
      } catch (error) {
        console.log(error);
        dispatch(setuserdetailfail(null));
      }
    };
    checkUser();
  }, []);
};

export default useCheckUser;
