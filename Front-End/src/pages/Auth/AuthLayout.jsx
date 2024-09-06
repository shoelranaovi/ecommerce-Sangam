import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="w-full h-screen flex gap 2 bg-slate-400">
      <div className="w-1/2 h-full bg-black flex justify-center items-center">
        <h1 className="text-white text-5xl text-center font-bold">
          Welcome to E Commerce Shipping
        </h1>
      </div>
      <div className="w-1/2 h-full bg-slate-200 flex justify-center items-center px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
