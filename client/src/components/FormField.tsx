import { ErrorMessage, Field } from "formik";
import { FormFieldProps } from "../types/types";

const FormField = ({ name, placeholder, type }: FormFieldProps) => (
  <>
    <Field
      name={name}
      placeholder={placeholder}
      type={type}
      className="border border-slate-300 w-full p-2 rounded mt-6"
    />
    <ErrorMessage className="text-red-500" name={name} component="div" />
  </>
);

export default FormField;
