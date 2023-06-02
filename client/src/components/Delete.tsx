import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppState } from "../types/types";

const API_URL_ADMIN = "http://localhost:3000/users/blog/";

interface props {
  id: string | undefined;
}

function Delete({ id }: props) {
  const token = useSelector((state: AppState) => state.app.user.token);
  const navigate = useNavigate();
  const [isClose, setIsClose] = useState(false);

  async function handleSubmit() {
    try {
      const res = await axios.delete(`${API_URL_ADMIN}${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/discover");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <FontAwesomeIcon
        className="absolute bg-black rounded-full px-2 py-1 right-[2%] top-[2%] text-red-500 text-xl font-bold cursor-pointer transform active:scale-95 hover:text-red-600"
        icon={faTimes}
        onClick={() => setIsClose(true)}
      />
      {isClose && (
        <div className="absolute z-10 left-[50%] -translate-x-1/2 top-[2%] bg-black rounded-xl p-4 text-center">
          <p className="text-white  mb-4">Are you sure you want to delete?</p>
          <div className="flex justify-center items-center">
            <FontAwesomeIcon
              className="text-green-500 font-bold text-xl cursor-pointer hover:text-green-700 mr-4 transform active:scale-95"
              icon={faCheck}
              onClick={handleSubmit}
            />
            <FontAwesomeIcon
              className="text-red-500 font-bold text-xl cursor-pointer hover:text-red-700 transform active:scale-95"
              icon={faTimes}
              onClick={() => setIsClose(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Delete;
