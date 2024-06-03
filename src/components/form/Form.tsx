import React from "react";
import { Formik, FormikHelpers, FormikValues } from "formik";
import * as Yup from "yup";

interface FormProps<T> {
  initialValues: T;
  onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<any>;
  validationSchema: Yup.ObjectSchema<any>;
  children: React.ReactNode;
}

function Form<T extends FormikValues>({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}: FormProps<T>) {
  return (
    <Formik<T>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default Form;
