import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const HomeLayout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-color-100">
      <NavBar />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 bg-mainvariant p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HomeLayout;