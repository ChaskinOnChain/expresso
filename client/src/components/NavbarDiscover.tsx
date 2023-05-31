import logoLight from "../assets/images/LogoLightTrans.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { arrayBufferToBase64ImgSrc } from "../utils/utils";

arrayBufferToBase64ImgSrc;
function NavbarDiscover() {
  const userProPic = useSelector((state) => state.app.user.img);
  return (
    <div className="h-28 w-full flex justify-between items-center">
      <div className="absolute h-4 w-full top-0 left-0 bg-gradient-to-br from-yellow-500 to-purple-500"></div>
      <Link className="flex items-center cursor-pointer" to="/discover">
        <img className="h-20 w-20" src={logoLight} alt="logo" />
        <span className="text-xl text-black font-bold">Expresso</span>
      </Link>
      <div className="mr-6 flex items-center gap-8">
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
        {userProPic && (
          <div className="relative">
            <div className="absolute top-[-2px] left-[-2px] h-[52px] w-[52px] bg-black rounded-full -z-10 hover:shadow-2xl"></div>
            <img
              className="h-12 w-12 rounded-full cursor-pointer"
              src={arrayBufferToBase64ImgSrc(userProPic.data)}
              alt="Profile"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default NavbarDiscover;
