import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MonthlyDataPage from "./pages/MonthlyDataPage";
import SettingPage from "./pages/SettingPage";
import HomeLayout from "./layouts/HomeLayout";

const router = createBrowserRouter([
  {
    // 로그인 페이지 (사이드바 없음)
    path: "/",
    element: <LoginPage />,
  },
  {
    // 나머지 페이지들 (사이드바 있음)
    element: <HomeLayout />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/monthly-data",
        element: <MonthlyDataPage />,
      },
      {
        path: "/settings",
        element: <SettingPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
