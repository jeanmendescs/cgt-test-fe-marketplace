import React from "react";
import "./BaseButton.scss";

type TBaseButtonElement = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

function BaseButton({ children, className, ...rest }: TBaseButtonElement) {
  const buttonClassName = className
    ? `base-button ${className}`
    : "base-button";

  return (
    <button className={buttonClassName} {...rest}>
      {children}
    </button>
  );
}

export default BaseButton;
