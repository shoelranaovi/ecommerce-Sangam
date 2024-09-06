import Header from "@/components/Admin-view/Header";
import SideBar from "@/components/Admin-view/Sidebar";

import { useState } from "react";

import { Outlet } from "react-router-dom";

function AdminLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col w-full ">
      <Header open={open} setOpen={setOpen} />
      <div className="flex">
        <SideBar open={open} setOpen={setOpen} />
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
