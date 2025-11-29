import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home/App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);

export default router;
