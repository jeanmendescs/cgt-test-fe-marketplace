import { createBrowserRouter } from "react-router-dom";
import Layout from "@components/Layout/Layout";
import HomePage from "@pages/Home/Home";
import CartPage from "@pages/Cart/Cart";
import ProductDetailPage from "@pages/ProductDetail/ProductDetail";
import "../styles/main.scss";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetailPage />,
      },
    ],
  },
]);

export default router;
