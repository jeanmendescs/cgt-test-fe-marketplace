import React from "react";
import "./ContainedButton.scss";
import BaseButton from "../Base/BaseButton";

type TButtonElement = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

function ContainedButton({ children, className, ...rest }: TButtonElement) {
  const buttonClassName = className
    ? `contained-button ${className}`
    : "contained-button";

  return (
    <BaseButton className={buttonClassName} {...rest}>
      {children}
    </BaseButton>
  );
}

export default ContainedButton;
