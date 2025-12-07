import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "@components/Layout/Layout";
import "../styles/main.scss";

// Lazy load routes for code splitting
const HomePage = lazy(() => import("@pages/Home/Home"));
const CartPage = lazy(() => import("@pages/Cart/Cart"));
const ProductDetailPage = lazy(
  () => import("@pages/ProductDetail/ProductDetail")
);
const CheckoutPage = lazy(() => import("@pages/Checkout/Checkout"));
const CheckoutSuccessPage = lazy(
  () => import("@pages/Checkout/CheckoutSuccess/CheckoutSuccess")
);
const NotFoundPage = lazy(() => import("@pages/NotFound/NotFound"));

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
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/checkout/success",
        element: <CheckoutSuccessPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
