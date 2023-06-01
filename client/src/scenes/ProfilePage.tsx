import { useEffect, useState } from "react";
import NavbarDiscover from "../components/NavbarDiscover";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import SingleBlog from "../components/SingleBlog";
import { ProfileBlog } from "../types/types";
import LoadingSpinner from "../components/LoadingSpinner";
import { arrayBufferToBase64ImgSrc } from "../utils/utils";

const API_URL = "http://localhost:3000/users/";

function ProfilePage() {
  const token = useSelector((state) => state.app.user.token);
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showMoreButton, setShowMoreButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function findUser() {
      try {
        setIsLoading(true);
        console.log(`${API_URL}${id}`);
        const res = await axios.get(`${API_URL}${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data.data;
        console.log(data);

        setCurrentUser(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    findUser();
  }, [id]);

  return (
    <div className="flex flex-col flex-grow max-w-[90rem] xl:mx-auto w-full h-full">
      <NavbarDiscover />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="px-12">
          <div className="flex md:flex-row flex-col gap-4 mb-8">
            <div className="mb-4">
              {currentUser && (
                <div className="flex flex-col items-center">
                  <img
                    className="h-40 w-40 border-4 border-black rounded-full cursor-pointer hover:shadow-2xl"
                    src={arrayBufferToBase64ImgSrc(currentUser.img.data)}
                    alt="Profile"
                  />
                  <h2 className="text-4xl font-bold mt-2 mb-1">
                    {currentUser?.username}
                  </h2>
                  <h4 className="text-xl">{currentUser?.email}</h4>
                </div>
              )}
            </div>
            <div className="h-32 w-96 bg-black text-white">
              PLACE HOLDER FOR ETHEREUM STUFF
            </div>
          </div>

          <div className="h-full w-full pt-1">
            <div>
              <h1 className="font-bold text-xl">Latest Blogs</h1>
              <div className="flex flex-wrap gap-4 mt-6">
                {currentUser &&
                  currentUser.blogs
                    .slice(0, 6)
                    .map((blog: ProfileBlog, index: number) => {
                      return (
                        <SingleBlog
                          id={blog._id}
                          key={index}
                          index={index}
                          hoveredIndex={hoveredIndex}
                          setHoveredIndex={setHoveredIndex}
                          img={blog.img}
                          title={blog.title}
                          date={blog.date}
                          tags={blog.tags}
                        />
                      );
                    })}
                {isLoading ? null : currentUser?.blogs.length > 6 &&
                  showMoreButton ? (
                  <div className="w-full text-center mt-4">
                    <button
                      onClick={() => setShowMoreButton(false)}
                      className="px-4 py-2 mb-4 font-bold border-[3px] text-sm border-black rounded-3xl hover:text-white hover:bg-black transition duration-500"
                    >
                      View More
                    </button>
                  </div>
                ) : (
                  currentUser?.blogs
                    .slice(6)
                    .map((blog: ProfileBlog, index: number) => {
                      return (
                        <SingleBlog
                          id={blog._id}
                          key={index}
                          index={index + 6}
                          hoveredIndex={hoveredIndex}
                          setHoveredIndex={setHoveredIndex}
                          img={blog.img}
                          title={blog.title}
                          date={blog.date}
                          tags={blog.tags}
                        />
                      );
                    })
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
