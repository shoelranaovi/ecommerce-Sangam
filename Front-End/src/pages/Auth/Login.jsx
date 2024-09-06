import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setuserdetail } from "@/Redux/AuthSlice";

function Login() {
  const [fromdata, setFromdata] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoding] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { email, password } = fromdata;
  console.log(email, password);

  function onchangehandler(e) {
    setFromdata((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }
  async function onsubmit(e) {
    e.preventDefault();
    setLoding(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/sign-in",
        fromdata,
        { withCredentials: true }
      );
      console.log(res);
      setLoding(false);
      if (res.data.success) {
        dispatch(setuserdetail(res.data.data));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoding(false);
    }
  }
  return (
    <div className="flex flex-col gap-3 w-full px-10 ">
      <div className="header text-center flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Sigin in to you Account </h1>
        <div className="text-lg">
          {`Don't`} Have An Account{" "}
          <Link to={"/auth/register-user"} className="font-bold">
            Register
          </Link>{" "}
        </div>
      </div>
      <form onSubmit={onsubmit} className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-1 w-ful">
          <Label className="font-bold">Email</Label>

          <Input
            value={email}
            id="email"
            onChange={onchangehandler}
            className="bg-slate-300"
            type="email"
            placeholder="Type your email"
          />
        </div>
        <div className="flex flex-col gap-1 w-ful">
          <Label className="font-bold">Password</Label>

          <Input
            value={password}
            id="password"
            onChange={onchangehandler}
            className="bg-slate-300"
            type="email"
            placeholder="Type your password"
          />
        </div>
        <Button onClick={onsubmit} className="w-full">
          {loading ? (
            <span className="flex gap-2">
              {" "}
              <Loader2 className="animate-spin" /> Please Wait{" "}
            </span>
          ) : (
            <span> Log In</span>
          )}{" "}
        </Button>
      </form>
    </div>
  );
}

export default Login;
