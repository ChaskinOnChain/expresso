import { useParams, useSearchParams } from "react-router-dom";
import NavbarDiscover from "../components/NavbarDiscover";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import SingleBlog from "../components/SingleBlog";
import { AppState, Blog } from "../types/types";
import NFT from "../components/NFT";

const API_URL_TAGS = import.meta.env.VITE_APP_API_URL_TAGS;
const API_URL_SEARCH = import.meta.env.VITE_APP_API_URL_SEARCH;

function Results() {
  const { name } = useParams();
  const [searchParams] = useSearchParams();
  const tag = searchParams.get("q");
  const token = useSelector((state: AppState) => state.app.user.token);
  const [blogs, setBlogs] = useState<Blog[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showMoreButton, setShowMoreButton] = useState(true);

  const BLOG_LIMIT = 6;
  const [displayedBlogs, setDisplayedBlogs] = useState<number>(BLOG_LIMIT);

  useEffect(() => {
    async function findUser() {
      try {
        setIsLoading(true);
        const API =
          name === "tag" ? `${API_URL_TAGS}${tag}` : `${API_URL_SEARCH}${tag}`;
        const res = await axios.get(API, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        setBlogs(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    findUser();
  }, [tag, name, token]);

  const showMoreBlogs = () => {
    if (blogs && blogs.length > displayedBlogs) {
      setDisplayedBlogs(displayedBlogs + BLOG_LIMIT);
    }
  };

  return (
    <div className="max-w-[90rem] w-full xl:mx-auto flex flex-col flex-grow pb-4">
      <NavbarDiscover />
      <div className="w-full h-full px-8">
        <h1 className="text-3xl font-bold">
          {name === "tag" ? "Tag" : "Search"} Results for{" "}
          <span className="capitalize">{tag}:</span>
        </h1>
        <div className="flex flex-wrap gap-4 h-[40%] my-6">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            blogs &&
            blogs.slice(0, displayedBlogs).map((blog, index: number) => {
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
          {isLoading ? null : blogs && blogs.length > displayedBlogs ? (
            <div className="w-full text-center my-4">
              <button
                onClick={showMoreBlogs}
                className="px-4 py-2 font-bold border-[3px] text-sm border-black rounded-3xl hover:text-white hover:bg-black transition duration-500"
              >
                View More
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <NFT />
    </div>
  );
}

export default Results;
