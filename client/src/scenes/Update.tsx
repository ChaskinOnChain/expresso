import { Formik, Field, ErrorMessage, Form, FormikHelpers } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import LoginBar from "../components/LoginBar";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateUser } from "../state";
import { AppState } from "../types/types";
import { useState } from "react";
import { logoutSuccess } from "../state";

const initialValues = {
  username: "",
  img: "",
  email: "",
  password: "",
  ethereum_address: "",
};

interface Values {
  username: string;
  img: any;
  email: string;
  password: string;
  ethereum_address: string;
  [key: string]: any;
}

const validationSchema = yup.object({
  username: yup.string(),
  email: yup.string().email("Invalid email address"),
  password: yup.string(),
  ethereum_address: yup
    .string()
    .matches(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
});

const API_URL = "http://localhost:3000/users/me/";

function Update() {
  const inputClass = `border border-slate-300 w-full p-2 rounded mt-6`;
  const navigate = useNavigate();
  const token = useSelector((state: AppState) => state.app.user.token);
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState(false);

  const handleFormSubmit = async (
    values: Values,
    onSubmitProps: FormikHelpers<Values>
  ) => {
    try {
      const formData = new FormData();
      if (values.img !== "") {
        formData.append("img", values.img);
      }
      for (const key in values) {
        if (key !== "img") {
          if (values[key] !== "") {
            formData.append(key, values[key]);
          }
        }
      }

      const res = await axios.put(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data.data;
      dispatch(updateUser(data));
      onSubmitProps.resetForm();
      navigate("/discover");
    } catch (error) {
      console.log(error);
    }
  };

  async function handleDelete() {
    try {
      await axios.delete(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(logoutSuccess());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-slate-100 relative h-screen w-screen">
      <LoginBar />
      <div className="w-full flex justify-center">
        <div className="bg-white mt-12 w-2/3 p-8 rounded relative">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <h3 className="font-bold">
                  Update Your Username, Email, Profile Picture, Ethereum Address
                  or Password
                </h3>
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
                <Dropzone
                  multiple={false}
                  accept={{ "image/*": [".jpeg", ".png", ".jpg"] }}
                  onDrop={(acceptedFiles) => {
                    setFieldValue("img", acceptedFiles[0]);
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <>
                      <div
                        {...getRootProps()}
                        className="border border-slate-300 py-3 px-2 mt-5 cursor-pointer rounded"
                      >
                        <input {...getInputProps()} />
                        <div className="border border-dashed text-slate-400 rounded border-sky-500 py-3 px-2">
                          {!values.img ? (
                            <p>Add Picture Here</p>
                          ) : (
                            <p className="flex justify-between items-center">
                              {values.img.name}
                              <FontAwesomeIcon
                                className="font-bold mr-4"
                                icon={faPencil}
                              />
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </Dropzone>
                <Field
                  name="ethereum_address"
                  placeholder="Ethereum Address"
                  type="text"
                  className={inputClass}
                />
                <ErrorMessage
                  className="text-red-500"
                  name="ethereum_address"
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
                  className="w-full bg-sky-500 text-white p-3 rounded hover:bg-sky-400 transition duration-500 mb-16 mt-8"
                >
                  UPDATE
                </button>
                <span
                  onClick={() => navigate("/discover")}
                  className="text-sky-400 underline text-sm cursor-pointer absolute right-8 top-5"
                >
                  Go Back
                </span>
              </Form>
            )}
          </Formik>

          <button
            onClick={() => setIsModal(true)}
            className="absolute left-1/2 bottom-5 transform -translate-x-1/2 py-2 px-4 text-white bg-red-600 rounded hover:bg-red-500 transition duration-200"
          >
            Delete Account
          </button>
        </div>
      </div>
      {isModal && (
        <div className="absolute top-0 left-0 bg-black/50 h-screen w-screen flex justify-center items-center">
          <div className="h-[15%] min-h-[165px] w-[31%] bg-white shadow-2xl rounded md:p-8 p-2">
            <h1 className="md:text-xl text:sm  mb-4">
              Are you sure you want to delete your account?
            </h1>
            <div className="flex items-end justify-end">
              <button
                className="font-bold"
                type="button"
                onClick={() => setIsModal(false)}
              >
                CANCEL
              </button>
              <button
                onClick={handleDelete}
                className="ml-2 md:ml-8 font-bold text-red-600"
                type="submit"
              >
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Update;
