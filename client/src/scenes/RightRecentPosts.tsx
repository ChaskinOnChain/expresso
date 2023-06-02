import Tag from "../components/Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { BlogReturn } from "../types/types";
import { arrayBufferToBase64ImgSrc, convertDate } from "../utils/utils";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function RightRecentPosts({ blogsArray }: { blogsArray: BlogReturn[] }) {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="md:w-[50%] w-full">
      {blogsArray.map((blog, index) => {
        const slicedContent =
          viewportWidth > 768
            ? blog.content.slice(0, 40)
            : blog.content.slice(0, 130);
        return (
          <div key={index} className="flex md:flex-row flex-col gap-4 mb-6">
            <div className="md:w-[49%] h-full w-full">
              <div className="relative">
                <Link to={`/discover/${blog._id}`}>
                  <img
                    className="md:h-32 h-full w-full"
                    src={arrayBufferToBase64ImgSrc(blog.img.data)}
                    alt={blog.title}
                  />
                </Link>
              </div>
            </div>
            <div className="md:w-[49%] w-full">
              <h4 className=" text-sm pb-2">
                <Link to={`/profile/${blog.author._id}`}>
                  {blog.author.username}
                </Link>{" "}
                -{convertDate(blog.date)}
              </h4>

              <Link
                className="flex justify-between"
                to={`/discover/${blog._id}`}
              >
                <h2 className="font-bold mb-2 cursor-pointer">{blog.title}</h2>
                <FontAwesomeIcon
                  className="font-bold cursor-pointer"
                  icon={faArrowUpRightFromSquare}
                />
              </Link>
              <p className="mb-2">{slicedContent}...</p>
              <div className="flex gap-2">
                <Tag name={blog.tags[0]} />
                <Tag name={blog.tags[1]} />
                <Tag name={blog.tags[2]} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RightRecentPosts;
