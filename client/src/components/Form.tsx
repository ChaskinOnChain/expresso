import { Formik, Field, Form as Furm } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../state";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  ApiRequestLogin,
  ApiRequestRegister,
  Blog,
  FormProps,
  User,
} from "../types/types";
import {
  validationSchemaLogin,
  validationSchemaRegister,
} from "../schemas/schemas";
import FormField from "./FormField";

const API_URL_LOGIN = import.meta.env.VITE_APP_API_URL_LOGIN;
const API_URL_REGISTER = import.meta.env.VITE_APP_API_URL_REGISTER;

type ApiRequest = ApiRequestLogin | ApiRequestRegister;

const initialValuesRegister: ApiRequestRegister = {
  username: "",
  img: "",
  email: "",
  password: "",
  role: "",
  ethereum_address: "",
  adminPassword: "",
};

const initialValuesLogin: ApiRequestLogin = {
  username: "",
  img: "",
  email: "",
  password: "",
  role: "user",
  ethereum_address: "",
  adminPassword: "",
};

const inputClass = `border border-slate-300 w-full p-2 rounded mt-6`;

const Form = ({ isLogin }: FormProps) => {
  const [loginBool, setloginBool] = useState(isLogin);
  const [fileName, setFileName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleFormSubmit = async (values: any, onSubmitProps: any) => {
    const url = loginBool ? API_URL_LOGIN : API_URL_REGISTER;
    if (!loginBool) {
      try {
        const formData = new FormData();
        const valuesRegister: ApiRequestRegister = values;
        formData.append("img", valuesRegister.img);
        for (const key in values) {
          if (key !== "img") {
            formData.append(key, valuesRegister[key]);
          }
        }
        const res = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const data = res.data;
        if (data) {
          onSubmitProps.resetForm();
          setloginBool(true);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const valuesLogin: ApiRequestLogin = values;
        const payload = {
          email: valuesLogin.email,
          password: valuesLogin.password,
        };
        const res = await axios.post(url, payload, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
        const data = res.data;
        if (data) {
          const blogs: Blog[] = [];
          const userInfo: User = {
            img: null,
            username: "",
            email: "",
            ethereum_address: "",
            role: "",
            token: "",
          };
          if (data.user) {
            for (const key in data.user) {
              if (key === "blogs") {
                data.user[key].forEach((blog: Blog) => {
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
          navigate("/discover");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="bg-white mt-12 w-2/3 p-8 rounded">
      <Formik
        onSubmit={(values: ApiRequest, formikHelpers) =>
          handleFormSubmit(values, formikHelpers) as any
        }
        initialValues={
          loginBool ? initialValuesLogin : (initialValuesRegister as ApiRequest)
        }
        validationSchema={
          loginBool ? validationSchemaLogin : validationSchemaRegister
        }
      >
        {({
          values,
          resetForm,
        }: {
          values: any;
          resetForm: () => void;
          setFieldValue: (
            field: string,
            value: any,
            shouldValidate?: boolean | undefined
          ) => void;
        }) => (
          <Furm>
            <h3 className="font-bold">
              Welcome to Expresso, where your thoughts brew into captivating
              stories
            </h3>
            {!loginBool && (
              <>
                <FormField name="username" placeholder="Username" type="text" />
                <div className="mt-6">
                  <Field
                    component={({ field, form }) => (
                      <div>
                        <input
                          id="img"
                          className="hidden"
                          name="img"
                          type="file"
                          onChange={(event: any) => {
                            form.setFieldValue(
                              field.name,
                              event.currentTarget.files[0]
                            );
                            setFileName(
                              event.currentTarget.files.length
                                ? event.currentTarget.files[0].name
                                : ""
                            );
                          }}
                        />
                        <button
                          type="button"
                          className="border border-slate-300 w-full p-2 rounded"
                          onClick={() => document.getElementById("img").click()}
                        >
                          {fileName || "Choose Your Profile Picture"}
                        </button>
                      </div>
                    )}
                    name="img"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <FormField
                  name="ethereum_address"
                  placeholder="Ethereum Address"
                  type="text"
                />
                <Field className={inputClass} as="select" name="role">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Field>
                {!loginBool && "role" in values && values.role === "admin" && (
                  <>
                    <FormField
                      name="adminPassword"
                      placeholder="Admin Password"
                      type="password"
                    />
                  </>
                )}
              </>
            )}
            <FormField name="email" placeholder="Email" type="email" />
            <FormField name="password" placeholder="Password" type="password" />
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
                  resetForm();
                  return !prevLoginBool;
                });
              }}
            >
              {!loginBool
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
