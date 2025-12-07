import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { TProduct } from "@store/cartStore";
import "./CartSummary.scss";
import { Button } from "@components/Button";
import useDialog from "@components/Dialog/hooks/useDialog";

const ConfirmDialog = lazy(
  () => import("@components/ConfirmDialog/ConfirmDialog")
);

type TCartProduct = Pick<TProduct, "id" | "name" | "price">;

type TCartSummary = {
  products: TCartProduct[];
  total: number;
  onClearCart: () => void;
};

function CartSummary({ products, total, onClearCart }: TCartSummary) {
  const { onOpen, onClose, isDialogOpen, dialogRef } = useDialog();

  const handleClearCartClick = () => {
    onOpen();
  };

  const handleConfirm = () => {
    onClearCart();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <>
      <aside className="cart-summary">
        <h3 className="cart-summary__title">Order Summary</h3>

        <div className="cart-summary__rows">
          {products.map((item) => (
            <div key={item.id} className="cart-summary__row">
              <span
                data-testid="cart-summary-name"
                className="cart-summary__name"
              >
                {item.name}
              </span>
              <span data-testid="cart-summary-price">
                ${item.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="cart-summary__divider"></div>

        <div className="cart-summary__total">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <div className="cart-summary__actions">
          <Link to="/" className="cart-summary__continue">
            ← Continue Shopping
          </Link>
          <Button.Outlined
            className="cart-summary__clear"
            onClick={handleClearCartClick}
          >
            Clear Cart
          </Button.Outlined>
        </div>
      </aside>

      {isDialogOpen && (
        <Suspense fallback={null}>
          <ConfirmDialog
            dialogRef={dialogRef}
            isOpen={isDialogOpen}
            title="Clear Cart"
            message="Are you sure you want to clear all items from your cart? This action cannot be undone."
            confirmText="Clear Cart"
            cancelText="Cancel"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        </Suspense>
      )}
    </>
  );
}

export default CartSummary;
