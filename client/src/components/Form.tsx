import { Formik, Field, ErrorMessage, Form as Furm } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { loginSuccess, updateUser } from "../state";
import axios from "axios";

const API_URL = "http://localhost:3000/users/signup";

interface Props {
  isLogin: boolean;
}

const initialValuesRegister = {
  username: "",
  img: "",
  email: "",
  password: "",
  role: "user",
  ethereum_address: "",
  adminPassword: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const inputClass = `border border-slate-300 w-full p-2 rounded mt-6`;

const validationSchemaLogin = yup.object({
  email: yup.string().email("Invalid email address").required("Required"),
  password: yup.string().required("Required"),
});

const validationSchemaRegister = yup.object({
  username: yup.string().required("Required"),
  img: yup.string().url("Must be a valid URL").required("Required"),
  email: yup.string().email("Invalid email address").required("Required"),
  password: yup.string().required("Required"),
  ethereum_address: yup
    .string()
    .matches(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address")
    .required("Required"),
  adminPassword: yup.string().when("role", (role, schema) => {
    return role === "admin" ? schema.required("Required") : schema;
  }),
});

const Form = ({ isLogin }: Props) => {
  const [pageType, setPageType] = useState(isLogin);
  const navigate = useNavigate();

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      const res = await axios.post(API_URL, values);
      const data = res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white mt-12 w-2/3 p-8 rounded">
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={pageType ? initialValuesLogin : initialValuesRegister}
        validationSchema={
          pageType ? validationSchemaLogin : validationSchemaRegister
        }
      >
        {({ values, handleChange, resetForm }) => (
          <Furm>
            <h3 className="font-bold">
              Welcome to Expresso, where your thoughts brew into captivating
              stories
            </h3>
            {!pageType && (
              <>
                <Field
                  name="username"
                  placeholder="Username"
                  type="text"
                  className={inputClass}
                />
                <ErrorMessage
                  className="text-red-500"
                  name="username"
                  component="div"
                />
                <Field
                  name="img"
                  placeholder="Profile Picture (url)"
                  type="text"
                  className={inputClass}
                />
                <ErrorMessage
                  className="text-red-500"
                  name="ethereum_address"
                  component="div"
                />
                <Field
                  name="ethereum_address"
                  placeholder="Ethereum Address"
                  type="text"
                  className={inputClass}
                />
                <ErrorMessage
                  className="text-red-500"
                  name="logo"
                  component="div"
                />
                <Field className={inputClass} as="select" name="role">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Field>
                {values.role === "admin" && (
                  <>
                    <Field
                      placeholder="Admin Password"
                      type="password"
                      name="adminPassword"
                      className={inputClass}
                    />
                    <ErrorMessage
                      className="text-red-500"
                      name="adminPassword"
                      component="div"
                    />
                  </>
                )}
              </>
            )}
            <Field
              name="email"
              placeholder="Email"
              type="email"
              className={inputClass}
            />
            <ErrorMessage
              className="text-red-500"
              name="email"
              component="div"
            />
            <Field
              name="password"
              placeholder="Password"
              type="password"
              className={inputClass}
            />
            <ErrorMessage
              className="text-red-500"
              name="password"
              component="div"
            />
            <button
              type="submit"
              className="w-full bg-sky-500 text-white p-3 rounded hover:bg-sky-400 transition duration-500 mb-8 mt-8"
            >
              {pageType ? "LOGIN" : "REGISTER"}
            </button>
            <span
              className="text-sky-400 underline text-sm cursor-pointer"
              onClick={() => {
                setPageType((prevLogin) => !prevLogin);
                if (prevLogin) {
                  resetForm({ values: initialValuesRegister });
                } else {
                  resetForm({ values: initialValuesLogin });
                }
              }}
            >
              {pageType
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </span>
          </Furm>
        )}
      </Formik>
    </div>
  );
};

export default Form;
