import { faUser, faEdit, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { logoutSuccess } from "../state";
import { useDispatch, useSelector } from "react-redux";
import { arrayBufferToBase64ImgSrc } from "../utils/utils";
import { AppState, MenuProps } from "../types/types";
import { Link, useNavigate } from "react-router-dom";

function Menu({ menuRef }: MenuProps) {
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const state = useSelector((state: AppState) => state.app.user);

  return (
    <div>
      <motion.div
        ref={menuRef}
        className="absolute w-30 bg-white border border-slate-300 shadow-xl rounded-xl top-16 right-5 p-4 z-10"
        initial={{ x: 500 }}
        animate={{ x: 0 }}
        exit={{ x: 500 }}
      >
        <div className="flex">
          <img
            className="h-[60px] w-[60px] rounded-full border-4 border-black mr-4"
            src={arrayBufferToBase64ImgSrc(state.img.data)}
            alt="Profile"
          />
          <div className="flex flex-col justify-center">
            <h3 className="font-bold">{state.username}</h3>
            <h4 className="text-sm">{state.email}</h4>
          </div>
        </div>
        <div className="h-[1px] w-[95%] bg-slate-300 mx-auto mt-3 mb-6"></div>
        <div className="flex flex-col gap-3">
          <Link
            to={`/profile/${state._id}`}
            className="flex item-center gap-2 cursor-pointer"
          >
            <FontAwesomeIcon className="mr-2 text-xl" icon={faUser} />
            <h4>Profile Page</h4>
          </Link>
          <Link to="/update" className="flex item-center gap-2 cursor-pointer">
            <FontAwesomeIcon className="mr-2 text-xl" icon={faEdit} />
            <h4>Edit Account</h4>
          </Link>
          <div
            onClick={() => {
              dispatch(logoutSuccess());
              naviagte("/login");
            }}
            className="flex item-center gap-2 cursor-pointer"
          >
            <FontAwesomeIcon className="mr-2 text-xl" icon={faSignOut} />
            <h4>Sign Out</h4>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Menu;
