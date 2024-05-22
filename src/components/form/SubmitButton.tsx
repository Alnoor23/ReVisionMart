import React from "react";
import Button, { ButtonProps } from "../basic/Button";
import { useFormikContext } from "formik";

const SubmitButton = ({ ...props }: ButtonProps) => {
  const { handleSubmit } = useFormikContext();

  return <Button {...props} onPress={handleSubmit} />;
};

export default SubmitButton;
