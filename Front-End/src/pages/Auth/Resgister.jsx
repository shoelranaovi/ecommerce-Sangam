import { Label } from "@radix-ui/react-label";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useState } from "react";

import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
// import { toast } from "sonner";

function UserRegister() {
  const [fromdata, setFromdata] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoding] = useState(false);
  const navigate = useNavigate();

  const { email, password, username } = fromdata;
  console.log(email, username, password);

  function onchangehandler(e) {
    setFromdata((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  async function onsubmit(e) {
    e.preventDefault();
    setLoding(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        fromdata,
        { withCredentials: true }
      );
      console.log(res);
      setLoding(false);
      toast.success(res.data.message);
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
      setLoding(false);
    }
  }
  return (
    <div className="flex flex-col gap-3 w-full px-10 ">
      <div className="header text-center flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Sigin in to you Account </h1>
        <div className="text-lg">
          Already Have an Account{" "}
          <Link to={"/auth/login"} className="font-bold">
            login
          </Link>{" "}
        </div>
      </div>
      <form onSubmit={onsubmit} className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-1 w-ful">
          <Label className="font-bold">Username:</Label>
          <Input
            value={username}
            id="username"
            onChange={onchangehandler}
            className="bg-slate-300"
            type="text"
            placeholder="Type your name"
          />
        </div>
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
            <span> Register</span>
          )}{" "}
        </Button>
      </form>
    </div>
  );
}

export default UserRegister;
