import { createBrowserRouter } from "react-router-dom";
import Layout from "@components/Layout/Layout";
import "../styles/global.scss";
import HomePage from "@pages/Home/Home";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
