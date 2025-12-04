import React from "react";
import "./OutlinedButton.scss";
import BaseButton from "../Base/BaseButton";

type TButtonElement = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

function OutlinedButton({ children, className, ...rest }: TButtonElement) {
  const buttonClassName = className
    ? `outlined-button ${className}`
    : "outlined-button";
  return (
    <BaseButton className={buttonClassName} {...rest}>
      {children}
    </BaseButton>
  );
}

export default OutlinedButton;
