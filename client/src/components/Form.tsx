import { Formik, Field, ErrorMessage, Form as Furm } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { loginSuccess } from "../state";
import axios from "axios";
import { useDispatch } from "react-redux";
import { TextField } from "formik-material-ui";

const API_URL_LOGIN = "http://localhost:3000/users/login";
const API_URL_REGISTER = "http://localhost:3000/users/signup";

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
  const [loginBool, setloginBool] = useState(isLogin);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSubmit = async (values, onSubmitProps) => {
    let url = loginBool ? API_URL_LOGIN : API_URL_REGISTER;
    const formData = new FormData();
    formData.append("img", values.img);

    for (let key in values) {
      if (key !== "img") {
        formData.append(key, values[key]);
      }
    }
    try {
      const res = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = res.data;
      if (data) {
        if (loginBool) {
          const blogs = [];
          const userInfo = {};
          if (data.user) {
            for (const key in data.user) {
              if (key === "blogs") {
                data.user[key].forEach((blog) => {
                  blogs.push(blog);
                });
              } else {
                userInfo[key] = data.user[key];
              }
            }
          }
          dispatch(
            loginSuccess({
              user: userInfo,
              token: data.token,
              blogs,
            })
          );
          onSubmitProps.resetForm();
          navigate("/");
        } else {
          onSubmitProps.resetForm();
          setloginBool(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white mt-12 w-2/3 p-8 rounded">
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={loginBool ? initialValuesLogin : initialValuesRegister}
        validationSchema={
          loginBool ? validationSchemaLogin : validationSchemaRegister
        }
      >
        {({ values, handleChange, resetForm }) => (
          <Furm>
            <h3 className="font-bold">
              Welcome to Expresso, where your thoughts brew into captivating
              stories
            </h3>
            {!loginBool && (
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
                <div className="mt-6">
                  <Field
                    label="Choose Your Profile Picture"
                    className={inputClass}
                    component={TextField}
                    type="file"
                    name="img"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
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
              {loginBool ? "LOGIN" : "REGISTER"}
            </button>
            <span
              className="text-sky-400 underline text-sm cursor-pointer"
              onClick={() => {
                setloginBool((prevLoginBool) => {
                  if (prevLoginBool) {
                    resetForm({ values: initialValuesRegister });
                  } else {
                    resetForm({ values: initialValuesLogin });
                  }
                  return !prevLoginBool;
                });
              }}
            >
              {loginBool
                ? "Already have an account? Login here."
                : "Don't have an account? Sign Up here."}
            </span>
          </Furm>
        )}
      </Formik>
    </div>
  );
};

export default Form;
