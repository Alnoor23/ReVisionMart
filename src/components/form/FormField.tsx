import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../../config/colors";
import Heading from "../basic/Heading";
import Input, { InputProps } from "../basic/Input";
import { useFormikContext, FormikContextType } from "formik";
import ErrorMessage from "./ErrorMessage";

interface FormFieldProps extends InputProps {
  name: string;
  heading?: string;
  bottomBorder?: boolean;
}

const FormField = <Values,>({
  name,
  heading,
  bottomBorder,
  ...props
}: FormFieldProps) => {
  const {
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    values,
  }: FormikContextType<Values> = useFormikContext();

  return (
    <View
      style={[
        styles.inputContainer,
        bottomBorder
          ? {
              borderBottomWidth: 3,
              borderBottomColor: colors.lightGray,
              backgroundColor: colors.transparent,
              borderWidth: 0,
            }
          : { backgroundColor: colors.white },
      ]}
    >
      {heading && <Heading>{heading}</Heading>}
      <Input
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={(values as any)[name]}
        {...props}
      />
      <ErrorMessage
        error={(errors as any)[name]}
        visible={(touched as any)[name]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: colors.lightGray,
    marginBottom: 10,
  },
});

export default FormField;
