import React from "react";
import { FormGroup, FormControl, ControlLabel } from "rsuite";

interface IProps {
  name: string;
  label: string;
  accepter?: React.ElementType;
}

const TextField = (props: IProps) => {
  const { name, label, accepter, ...rest } = props;

  return (
    <FormGroup>
      <ControlLabel>{label} </ControlLabel>
      <FormControl name={name} accepter={accepter} {...rest} />
    </FormGroup>
  );
};

export default TextField;
