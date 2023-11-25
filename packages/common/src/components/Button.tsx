import React from "react";

interface ButtonProps {
  onClick: () => void;
}

const Button = ({ onClick }: ButtonProps) => {
  return <div onClick={onClick}>Button Test</div>;
};

export default Button;
