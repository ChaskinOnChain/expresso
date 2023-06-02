import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL_ADMIN = "http://localhost:3000/admin/blog/";

interface props {
  id: string | undefined;
}

function Delete({ id }: props) {
  const token = useSelector((state) => state.app.user.token);
  const navigate = useNavigate();
  const [isClose, setIsClose] = useState(false);

  async function handleSubmit() {
    try {
      const res = await axios.delete(`${API_URL_ADMIN}${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <FontAwesomeIcon
        className="absolute bg-black rounded-full px-2 py-1 right-[2%] top-[2%] text-red-500 text-3xl font-bold cursor-pointer"
        icon={faTimes}
        onClick={() => setIsClose(true)}
      />
      {isClose && (
        <div className="absolute z-10 left-[50%] -translate-x-1/2 top-[2%] bg-black rounded-xl px-2 p-1 text-center">
          <span className="text-white">
            Are you sure <br /> you want to delete <br />
          </span>
          <FontAwesomeIcon
            className="text-green-500 font-bold ml-4 text-xl cursor-pointer"
            icon={faCheck}
            onClick={handleSubmit}
          />
          <FontAwesomeIcon
            className="text-red-500 font-bold ml-4 text-xl cursor-pointer"
            icon={faTimes}
            onClick={() => setIsClose(false)}
          />
        </div>
      )}
    </>
  );
}

export default Delete;
