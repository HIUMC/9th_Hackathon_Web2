import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import SideBar from "../components/SIdeBar";

const HomeLayout = () => {
  return (
    <div>
      <nav>
        <NavBar />
      </nav>
      <main>
        <SideBar />
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default HomeLayout;
