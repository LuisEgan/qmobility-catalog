import React from "react";

interface IButton {
  onClick: () => void;
  label?: string;
}

const Button = (props: IButton) => {
  const { label } = props;

  return <div>{label}</div>;
};

Button.defaultProps = {};

export default Button;
