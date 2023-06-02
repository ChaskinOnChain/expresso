import logoLight from "../assets/images/LogoLightTrans.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { arrayBufferToBase64ImgSrc } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBars,
  faUser,
  faEdit,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../state";
import { AppState } from "../types/types";

function NavbarDiscover() {
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: AppState) => state.app.user);
  const [showMenu, setShowMenu] = useState(false);
  const [isBarsWhite, setIsBarsWhite] = useState(false);

  function handleKey(e: any) {
    if (e.key === "Enter") {
      naviagte(`http://localhost:5173/search/name/?q=${e.target.value}`);
      e.target.value = "";
      e.target.blur();
    }
  }

  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-28 w-full flex justify-between items-center max-w-[90rem] xl:mx-auto">
      <div className="absolute h-4 w-full top-0 left-0 bg-gradient-to-br from-yellow-500 to-purple-500"></div>
      <div className="flex items-center">
        <Link className="flex items-center cursor-pointer" to="/discover">
          <img className="h-20 w-20" src={logoLight} alt="logo" />
          <span className="text-xl text-black font-bold -ml-2">Expresso</span>
        </Link>
        <div className="relative">
          <input
            onKeyDown={(e) => handleKey(e)}
            type="text"
            className="ml-4 px-3 py-2 text-sm rounded w-[300px] bg-slate-100 hidden lg:inline-block"
            placeholder="Search..."
          />
          <FontAwesomeIcon
            className="-ml-8 hidden lg:inline-block"
            icon={faMagnifyingGlass}
          />
        </div>
      </div>
      <div className="relative">
        <div className="mr-6 md:flex items-center gap-4 hidden">
          <Link to="/create">
            <button className="border-[3px] border-black shadow-md cursor-pointer font-bold tracking-wider px-2 py-1 rounded-md hover:bg-black hover:text-white transition duration-500">
              Create Blog
            </button>
          </Link>
          <Link to="/discover">
            <button className="border-[3px] border-black shadow-md cursor-pointer font-bold tracking-wider px-3 py-1 rounded-md  hover:bg-black hover:text-white transition duration-500">
              Discover
            </button>
          </Link>
          {state && (
            <>
              <div
                ref={buttonRef}
                onClick={() => setShowMenu((prev) => !prev)}
                className="flex justify-center items-center border-black border-4 pl-4 rounded-[2rem] cursor-pointer hover:bg-black transition duration-500"
                onMouseEnter={() => setIsBarsWhite(true)}
                onMouseLeave={() => setIsBarsWhite(false)}
              >
                <FontAwesomeIcon
                  className={`mr-2 text-2xl ${
                    isBarsWhite && "text-white"
                  } transition duration-500`}
                  icon={faBars}
                />
                {state && state.img && (
                  <img
                    className="h-[52px] w-[52px] rounded-full cursor-pointer hover:shadow-2xl "
                    src={arrayBufferToBase64ImgSrc(state.img.data)}
                    alt="Profile"
                  />
                )}
              </div>

              <AnimatePresence>
                {showMenu && (
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
                        <FontAwesomeIcon
                          className="mr-2 text-xl"
                          icon={faUser}
                        />
                        <h4>Profile Page</h4>
                      </Link>
                      <Link
                        to="/update"
                        className="flex item-center gap-2 cursor-pointer"
                      >
                        <FontAwesomeIcon
                          className="mr-2 text-xl"
                          icon={faEdit}
                        />
                        <h4>Edit Account</h4>
                      </Link>
                      <div
                        onClick={() => {
                          localStorage.clear();
                          dispatch(logoutSuccess());
                          naviagte("/login");
                        }}
                        className="flex item-center gap-2 cursor-pointer"
                      >
                        <FontAwesomeIcon
                          className="mr-2 text-xl"
                          icon={faSignOut}
                        />
                        <h4>Sign Out</h4>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
        <FontAwesomeIcon className="mr-6 text-2xl md:hidden" icon={faBars} />
      </div>
    </div>
  );
}

export default NavbarDiscover;
