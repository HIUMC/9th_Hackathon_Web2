import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const HomeLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-color-100">
      <NavBar />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 ml-64 pt-6 px-8 bg-400">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HomeLayout;