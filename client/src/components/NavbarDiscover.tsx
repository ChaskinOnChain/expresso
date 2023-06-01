import logoLight from "../assets/images/LogoLightTrans.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { arrayBufferToBase64ImgSrc } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBars } from "@fortawesome/free-solid-svg-icons";

function NavbarDiscover() {
  const naviagte = useNavigate();
  const state = useSelector((state) => state.app.user);

  function handleKey(e) {
    if (e.key === "Enter") {
      naviagte(`http://localhost:5173/search/name/?q=${e.target.value}`);
      e.target.value = "";
      e.target.blur();
    }
  }

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
      <div className="">
        <div className="mr-6 md:flex items-center gap-4 hidden md:inline-block">
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
            <Link to={`/profile/${state._id}`}>
              <img
                className="h-[52px] w-[52px] rounded-full cursor-pointer hover:shadow-2xl border-4 border-black"
                src={arrayBufferToBase64ImgSrc(state.img.data)}
                alt="Profile"
              />
            </Link>
          )}
        </div>
        <FontAwesomeIcon className="mr-6 text-2xl md:hidden" icon={faBars} />
      </div>
    </div>
  );
}

export default NavbarDiscover;
