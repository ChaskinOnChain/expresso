import NavbarDiscover from "../components/NavbarDiscover";
import { useSelector } from "react-redux";
import { arrayBufferToBase64ImgSrc } from "../utils/utils";

function ProfilePage() {
  const userState = useSelector((state) => state.app.user);

  return (
    <div>
      <NavbarDiscover />
      <div className="h-screen w-full px-6 pt-1">
        <div className="text-2xl flex">
          <img
            className="rounded-md h-32 w-32 mr-8"
            src={arrayBufferToBase64ImgSrc(userState.img.data)}
            alt="propic"
          />
          <div>
            <p className="mb-4">{userState.username}</p>
            <p className="text-sm">{userState.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
