import { createBrowserRouter } from "react-router-dom";
import Layout from "@components/Layout/Layout";
import HomePage from "@pages/Home/Home";
import "../styles/main.scss";

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
