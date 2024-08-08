import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import Home from "@/pages/home";
import SignUp from "@/pages/sign-up";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <SignUp />,
      },
    ],
  },
]);
export default Routes;
