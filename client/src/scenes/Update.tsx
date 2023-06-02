import { Formik, Field, ErrorMessage, Form } from "formik";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import LoginBar from "../components/LoginBar";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateUser } from "../state";

const initialValues = {
  username: "",
  img: "",
  email: "",
  password: "",
  ethereum_address: "",
};

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
  const token = useSelector((state) => state.app.user.token);
  const dispatch = useDispatch();

  const handleFormSubmit = async (values: any, onSubmitProps: any) => {
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
      console.log(data);
      dispatch(updateUser(data));
      onSubmitProps.resetForm();
      navigate("/discover");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-100 h-screen w-screen">
      <LoginBar />
      <div className="w-full flex justify-center">
        <div className="bg-white mt-12 w-2/3 p-8 rounded">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ values, resetForm, setFieldValue }) => (
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
                  className="w-full bg-sky-500 text-white p-3 rounded hover:bg-sky-400 transition duration-500 mb-8 mt-8"
                >
                  UPDATE
                </button>
                <span
                  onClick={() => navigate("/discover")}
                  className="text-sky-400 underline text-sm cursor-pointer"
                >
                  Go Back
                </span>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Update;
