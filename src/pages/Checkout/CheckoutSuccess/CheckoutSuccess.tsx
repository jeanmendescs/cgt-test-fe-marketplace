import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@components/Button";
import "./CheckoutSuccess.scss";

function CheckoutSuccess() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Order Confirmed - 90s Marketplace</title>
        <meta
          name="description"
          content="Your order has been successfully placed at 90s Marketplace"
        />
      </Helmet>
      <main className="checkout-success">
        <div className="checkout-success__container">
          <div className="checkout-success__icon" aria-hidden="true">
            ✓
          </div>
          <h1 className="checkout-success__title">Order Confirmed!</h1>
          <p className="checkout-success__message">
            Thank you for your purchase. Your order has been successfully placed
            and you will receive a confirmation email shortly.
          </p>
          <div className="checkout-success__actions">
            <Button.Contained
              onClick={() => navigate("/")}
              aria-label="Continue shopping"
            >
              Continue Shopping
            </Button.Contained>
            <Button.Outlined
              onClick={() => navigate("/cart")}
              aria-label="View cart"
            >
              View Cart
            </Button.Outlined>
          </div>
        </div>
      </main>
    </>
  );
}

export default CheckoutSuccess;
