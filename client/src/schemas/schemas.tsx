import * as yup from "yup";

export const blogSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
  tags: yup.string().required("required tags"),
});

export const validationSchema = yup.object({
  username: yup.string(),
  email: yup.string().email("Invalid email address"),
  password: yup.string(),
  ethereum_address: yup
    .string()
    .matches(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
});

export const validationSchemaLogin = yup.object({
  email: yup.string().email("Invalid email address").required("Required"),
  password: yup.string().required("Required"),
});

export const validationSchemaRegister = yup.object({
  username: yup.string().required("Required"),
  email: yup.string().email("Invalid email address").required("Required"),
  password: yup.string().required("Required"),
  ethereum_address: yup
    .string()
    .matches(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address")
    .required("Required"),
  role: yup
    .string()
    .oneOf(["user", "admin", ""], "Invalid role")
    .required("Role is required"),
  adminPassword: yup.string().when("role", (role: any, schema) => {
    return role === "admin" ? schema.required("Required") : schema;
  }),
});
