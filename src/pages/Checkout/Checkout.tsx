import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm, Controller } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import useCartStore, { TProduct } from "@store/cartStore";
import useProducts from "@contexts/useProducts";
import { Button } from "@components/Button";
import { toast } from "react-toastify";
import "./Checkout.scss";
import { CartSummary } from "@components/CartSummary/CartSummary";

type TFormData = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
};

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isSubmittingRef = useRef(false);
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const { getProductById } = useProducts();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<TFormData>({
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    },
  });

  // Redirect if cart is empty (but not if we're submitting or navigating away from checkout)
  useEffect(() => {
    if (
      items.size === 0 &&
      location.pathname === "/checkout" &&
      !isSubmittingRef.current
    ) {
      navigate("/cart");
    }
  }, [items.size, navigate, location.pathname]);

  const cartProducts = Array.from(items)
    .map((item) => getProductById(item))
    .filter((product): product is TProduct => product !== undefined);
  const total = cartProducts.reduce((sum, item) => sum + item.price, 0);

  // Format input values for display
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    return cleaned.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatNumericOnly = (value: string) => {
    return value.replace(/\D/g, "");
  };

  // Custom onChange handlers for formatted inputs
  const createFormattedHandler = (
    formatter: (value: string) => string,
    fieldName: keyof TFormData,
    registerOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      const formatted = formatter(newValue);
      const syntheticEvent = {
        ...e,
        target: { ...e.target, value: formatted },
      };
      setValue(fieldName, formatted, { shouldValidate: true });
      registerOnChange(syntheticEvent);
    };
  };

  const onSubmit = () => {
    // Simulate checkout processing
    isSubmittingRef.current = true;
    toast.success("Order placed successfully!");
    // Navigate first, then clear cart to prevent redirect
    navigate("/checkout/success");
    clearCart();
  };

  return (
    <>
      <Helmet>
        <title>Checkout - 90s Marketplace</title>
        <meta
          name="description"
          content="Complete your purchase at 90s Marketplace"
        />
      </Helmet>
      <main className="checkout-page">
        <div className="checkout-page__container">
          <h1 className="checkout-page__title">Checkout</h1>

          <div className="checkout-page__content">
            <form className="checkout-form" onSubmit={handleSubmit(onSubmit)}>
              <section className="checkout-form__section">
                <h2 className="checkout-form__section-title">
                  Shipping Information
                </h2>
                <div className="checkout-form__fields">
                  <div className="checkout-form__field">
                    <label htmlFor="fullName" className="checkout-form__label">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      {...register("fullName", {
                        required: "Full name is required",
                        minLength: {
                          value: 2,
                          message: "Full name must be at least 2 characters",
                        },
                      })}
                      className={`checkout-form__input ${
                        errors.fullName ? "checkout-form__input--error" : ""
                      }`}
                      aria-invalid={!!errors.fullName}
                      aria-describedby={
                        errors.fullName ? "fullName-error" : undefined
                      }
                    />
                    {errors.fullName && (
                      <span
                        id="fullName-error"
                        className="checkout-form__error"
                        role="alert"
                      >
                        {errors.fullName.message}
                      </span>
                    )}
                  </div>

                  <div className="checkout-form__field">
                    <label htmlFor="email" className="checkout-form__label">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email address",
                        },
                      })}
                      className={`checkout-form__input ${
                        errors.email ? "checkout-form__input--error" : ""
                      }`}
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                    />
                    {errors.email && (
                      <span
                        id="email-error"
                        className="checkout-form__error"
                        role="alert"
                      >
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <div className="checkout-form__field">
                    <label htmlFor="address" className="checkout-form__label">
                      Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      {...register("address", {
                        required: "Address is required",
                        minLength: {
                          value: 5,
                          message: "Address must be at least 5 characters",
                        },
                      })}
                      className={`checkout-form__input ${
                        errors.address ? "checkout-form__input--error" : ""
                      }`}
                      aria-invalid={!!errors.address}
                      aria-describedby={
                        errors.address ? "address-error" : undefined
                      }
                    />
                    {errors.address && (
                      <span
                        id="address-error"
                        className="checkout-form__error"
                        role="alert"
                      >
                        {errors.address.message}
                      </span>
                    )}
                  </div>

                  <div className="checkout-form__row">
                    <div className="checkout-form__field">
                      <label htmlFor="city" className="checkout-form__label">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        {...register("city", {
                          required: "City is required",
                          minLength: {
                            value: 2,
                            message: "City must be at least 2 characters",
                          },
                        })}
                        className={`checkout-form__input ${
                          errors.city ? "checkout-form__input--error" : ""
                        }`}
                        aria-invalid={!!errors.city}
                        aria-describedby={
                          errors.city ? "city-error" : undefined
                        }
                      />
                      {errors.city && (
                        <span
                          id="city-error"
                          className="checkout-form__error"
                          role="alert"
                        >
                          {errors.city.message}
                        </span>
                      )}
                    </div>

                    <div className="checkout-form__field">
                      <label htmlFor="state" className="checkout-form__label">
                        State *
                      </label>
                      <input
                        type="text"
                        id="state"
                        {...register("state", {
                          required: "State is required",
                          minLength: {
                            value: 2,
                            message: "State must be at least 2 characters",
                          },
                        })}
                        className={`checkout-form__input ${
                          errors.state ? "checkout-form__input--error" : ""
                        }`}
                        aria-invalid={!!errors.state}
                        aria-describedby={
                          errors.state ? "state-error" : undefined
                        }
                      />
                      {errors.state && (
                        <span
                          id="state-error"
                          className="checkout-form__error"
                          role="alert"
                        >
                          {errors.state.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="checkout-form__row">
                    <div className="checkout-form__field">
                      <label htmlFor="zipCode" className="checkout-form__label">
                        ZIP Code *
                      </label>
                      <input
                        type="tel"
                        inputMode="numeric"
                        id="zipCode"
                        {...(() => {
                          const { onChange, ...rest } = register("zipCode", {
                            required: "ZIP code is required",
                            pattern: {
                              value: /^\d+$/,
                              message: "ZIP code must contain only numbers",
                            },
                            minLength: {
                              value: 5,
                              message: "ZIP code must be at least 5 digits",
                            },
                          });
                          return {
                            ...rest,
                            onChange: createFormattedHandler(
                              formatNumericOnly,
                              "zipCode",
                              onChange
                            ),
                          };
                        })()}
                        className={`checkout-form__input ${
                          errors.zipCode ? "checkout-form__input--error" : ""
                        }`}
                        aria-invalid={!!errors.zipCode}
                        aria-describedby={
                          errors.zipCode ? "zipCode-error" : undefined
                        }
                      />
                      {errors.zipCode && (
                        <span
                          id="zipCode-error"
                          className="checkout-form__error"
                          role="alert"
                        >
                          {errors.zipCode.message}
                        </span>
                      )}
                    </div>

                    <div className="checkout-form__field">
                      <label htmlFor="country" className="checkout-form__label">
                        Country *
                      </label>
                      <input
                        type="text"
                        id="country"
                        {...register("country", {
                          required: "Country is required",
                          minLength: {
                            value: 2,
                            message: "Country must be at least 2 characters",
                          },
                        })}
                        className={`checkout-form__input ${
                          errors.country ? "checkout-form__input--error" : ""
                        }`}
                        aria-invalid={!!errors.country}
                        aria-describedby={
                          errors.country ? "country-error" : undefined
                        }
                      />
                      {errors.country && (
                        <span
                          id="country-error"
                          className="checkout-form__error"
                          role="alert"
                        >
                          {errors.country.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <section className="checkout-form__section">
                <h2 className="checkout-form__section-title">
                  Payment Information
                </h2>
                <div className="checkout-form__fields">
                  <div className="checkout-form__field">
                    <label
                      htmlFor="cardNumber"
                      className="checkout-form__label"
                    >
                      Card Number *
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      id="cardNumber"
                      {...(() => {
                        const { onChange, ...rest } = register("cardNumber", {
                          required: "Card number is required",
                          validate: (value) => {
                            const cleaned = value.replace(/\s/g, "");
                            if (!/^\d{13,19}$/.test(cleaned)) {
                              return "Please enter a valid card number (13-16 digits)";
                            }
                            return true;
                          },
                        });
                        return {
                          ...rest,
                          onChange: createFormattedHandler(
                            formatCardNumber,
                            "cardNumber",
                            onChange
                          ),
                        };
                      })()}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className={`checkout-form__input ${
                        errors.cardNumber ? "checkout-form__input--error" : ""
                      }`}
                      aria-invalid={!!errors.cardNumber}
                      aria-describedby={
                        errors.cardNumber ? "cardNumber-error" : undefined
                      }
                    />
                    {errors.cardNumber && (
                      <span
                        id="cardNumber-error"
                        className="checkout-form__error"
                        role="alert"
                      >
                        {errors.cardNumber.message}
                      </span>
                    )}
                  </div>

                  <div className="checkout-form__field">
                    <label htmlFor="cardName" className="checkout-form__label">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      {...register("cardName", {
                        required: "Cardholder name is required",
                        minLength: {
                          value: 2,
                          message:
                            "Cardholder name must be at least 2 characters",
                        },
                      })}
                      className={`checkout-form__input ${
                        errors.cardName ? "checkout-form__input--error" : ""
                      }`}
                      aria-invalid={!!errors.cardName}
                      aria-describedby={
                        errors.cardName ? "cardName-error" : undefined
                      }
                    />
                    {errors.cardName && (
                      <span
                        id="cardName-error"
                        className="checkout-form__error"
                        role="alert"
                      >
                        {errors.cardName.message}
                      </span>
                    )}
                  </div>

                  <div className="checkout-form__row">
                    <div className="checkout-form__field">
                      <label
                        htmlFor="expiryDate"
                        className="checkout-form__label"
                      >
                        Expiry Date *
                      </label>
                      <Controller
                        name="expiryDate"
                        control={control}
                        rules={{
                          required: "Expiry date is required",
                          validate: (value) => {
                            if (!value) {
                              return "Expiry date is required";
                            }

                            // value format is MM/YY
                            if (!/^\d{2}\/\d{2}$/.test(value)) {
                              return "Please enter a valid expiry date (MM/YY)";
                            }

                            const [month, year] = value.split("/").map(Number);
                            const expiryMonth = month;
                            const expiryYear = year;

                            // Validate month is between 01-12
                            if (expiryMonth < 1 || expiryMonth > 12) {
                              return "Month must be between 01 and 12";
                            }

                            // Get current date
                            const now = new Date();
                            const currentMonth = now.getMonth() + 1; // getMonth() returns 0-11
                            const currentYear = now.getFullYear();

                            // Convert expiry year to full year (assuming 20xx for years 00-99)
                            const fullExpiryYear = 2000 + expiryYear;

                            // Check if expiry date is in the past
                            if (
                              fullExpiryYear < currentYear ||
                              (fullExpiryYear === currentYear &&
                                expiryMonth < currentMonth)
                            ) {
                              return "Expiry date cannot be in the past";
                            }

                            return true;
                          },
                        }}
                        render={({ field, fieldState }) => {
                          const { ref, ...fieldProps } = field;
                          return (
                            <PatternFormat
                              {...fieldProps}
                              getInputRef={ref}
                              id="expiryDate"
                              format="##/##"
                              mask={["M", "M", "Y", "Y"]}
                              placeholder="MM/YY"
                              allowEmptyFormatting
                              className={`checkout-form__input ${
                                fieldState.error
                                  ? "checkout-form__input--error"
                                  : ""
                              }`}
                              aria-invalid={!!fieldState.error}
                              aria-describedby={
                                fieldState.error
                                  ? "expiryDate-error"
                                  : undefined
                              }
                            />
                          );
                        }}
                      />
                      {errors.expiryDate && (
                        <span
                          id="expiryDate-error"
                          className="checkout-form__error"
                          role="alert"
                        >
                          {errors.expiryDate.message}
                        </span>
                      )}
                    </div>

                    <div className="checkout-form__field">
                      <label htmlFor="cvv" className="checkout-form__label">
                        CVV *
                      </label>
                      <input
                        type="tel"
                        inputMode="numeric"
                        id="cvv"
                        {...(() => {
                          const { onChange, ...rest } = register("cvv", {
                            required: "CVV is required",
                            pattern: {
                              value: /^\d{3,4}$/,
                              message: "Please enter a valid CVV (3-4 digits)",
                            },
                          });
                          return {
                            ...rest,
                            onChange: createFormattedHandler(
                              formatNumericOnly,
                              "cvv",
                              onChange
                            ),
                          };
                        })()}
                        placeholder="1234"
                        maxLength={4}
                        className={`checkout-form__input ${
                          errors.cvv ? "checkout-form__input--error" : ""
                        }`}
                        aria-invalid={!!errors.cvv}
                        aria-describedby={errors.cvv ? "cvv-error" : undefined}
                      />
                      {errors.cvv && (
                        <span
                          id="cvv-error"
                          className="checkout-form__error"
                          role="alert"
                        >
                          {errors.cvv.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <div className="checkout-form__actions">
                <Button.Outlined
                  type="button"
                  onClick={() => navigate("/cart")}
                  aria-label="Go back to cart"
                >
                  ← Back to Cart
                </Button.Outlined>
                <Button.Contained type="submit" aria-label="Complete purchase">
                  Complete Purchase
                </Button.Contained>
              </div>
            </form>

            <CartSummary.Root>
              <CartSummary.Body products={cartProducts} total={total} />
            </CartSummary.Root>
          </div>
        </div>
      </main>
    </>
  );
}

export default Checkout;
