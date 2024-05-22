import React from "react";
import { Formik, FormikHelpers, FormikValues } from "formik";
import * as Yup from "yup";

interface FormProps extends FormikValues {
  initialValues: FormikValues;
  onSubmit: (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>
  ) => void | Promise<any>;
  validationSchema: Yup.ObjectSchema<any>;
  children: React.ReactNode;
}

function Form({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}: FormProps) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default Form;
