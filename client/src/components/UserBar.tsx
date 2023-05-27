import logoLight from "../assets/images/LogoLightTrans.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function UserBar() {
  return (
    <div className="h-20 w-full bg-white flex items-center justify-between">
      <div className="flex items-center">
        <img className="h-20 w-20" src={logoLight} alt="logo" />
        <h1 className="text-3xl text-sky-500 font-bold">Expresso</h1>
        <input
          className="ml-8 p-2 pl-4 w-[20rem] rounded-lg bg-slate-100"
          type="text"
          placeholder="Search..."
        />
        <FontAwesomeIcon
          className="text-xl text-slate-500 -ml-10"
          icon={faMagnifyingGlass}
        />
      </div>
    </div>
  );
}

export default UserBar;
