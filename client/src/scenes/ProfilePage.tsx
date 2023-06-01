import { useEffect } from "react";
import NavbarDiscover from "../components/NavbarDiscover";
import { arrayBufferToBase64ImgSrc } from "../utils/utils";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const API_URL = "http://localhost:3000/users/";

function ProfilePage() {
  const token = useSelector((state) => state.app.user.token);
  const { id } = useParams();

  useEffect(() => {
    async function findUser() {
      console.log(`${API_URL}${id}`);
      const res = await axios.get(`${API_URL}${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data.data;
      console.log(data);
    }
    findUser();
  }, []);

  return (
    <div>
      <NavbarDiscover />
      <div className="h-screen w-full px-6 pt-1">
        <div>
          <h1 className="font-bold text-xl">Latest Articles</h1>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
