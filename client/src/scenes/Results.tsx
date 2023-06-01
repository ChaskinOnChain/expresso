import { useParams, useSearchParams } from "react-router-dom";
import NavbarDiscover from "../components/NavbarDiscover";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import SingleBlog from "../components/SingleBlog";

const API_URL_TAGS = "http://localhost:3000/blogs/filter/?tags=";
const API_URL_SEARCH = "http://localhost:3000/blogs/search/?search="

function Results() {
  const {name} = useParams();
  const [searchParams] = useSearchParams();
  const tag = searchParams.get("q");
  const token = useSelector((state) => state.app.user.token);
  const [blogs, setBlogs] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showMoreButton, setShowMoreButton] = useState(true);

  useEffect(() => {
    async function findUser() {
      try {
        setIsLoading(true);
        const API = name === "tag" ? `${API_URL_TAGS}${tag}` : `${API_URL_SEARCH}${tag}`
        const res = await axios.get(API, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        console.log(data.data);

        setBlogs(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    findUser();
  }, [tag]);

  return (
    <div className="max-w-[90rem] w-full xl:mx-auto flex flex-col flex-grow">
      <NavbarDiscover />
      <div className="w-full h-full px-8">
        <h1 className="text-3xl font-bold">
          {name === "tag" ? "Tag" : "Search"} Results for <span className="capitalize">{tag}:</span>
        </h1>
        <div className="flex flex-wrap gap-4 h-[40%] mt-6">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            blogs &&
            blogs.slice(0, 6).map((blog, index: number) => {
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
            })
          )}
          {isLoading ? null : blogs?.length > 6 && showMoreButton ? (
            <div className="w-full text-center mt-4">
              <button
                onClick={() => setShowMoreButton(false)}
                className="px-4 py-2 font-bold border-[3px] text-sm border-black rounded-3xl hover:text-white hover:bg-black transition duration-500"
              >
                View More
              </button>
            </div>
          ) : (
            blogs?
              .slice(6)
              .map((blog, index: number) => {
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
  );
}

export default Results;
