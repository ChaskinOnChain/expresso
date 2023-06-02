import { useEffect, useState } from "react";
import LeftRecentPosts from "./LeftRecentPosts";
import RightRecentPosts from "./RightRecentPosts";
import axios from "axios";
import { useSelector } from "react-redux";
import { BlogReturn } from "../types/types";
import LoadingSpinner from "../components/LoadingSpinner";

const API_URL_BLOGS = "http://localhost:3000/blogs/all";

function RecentBlogPosts() {
  const token = useSelector((state) => state.app.user.token);
  const [firstBlog, setFirstBlog] = useState<BlogReturn | null>(null);
  const [blogsTwoThruFour, setBlogsTwoThruFour] = useState<BlogReturn[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getBlogs() {
      try {
        setIsLoading(true);
        const res = await axios.get(API_URL_BLOGS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        console.log(data.data);
        setFirstBlog(data.data[0]);
        setBlogsTwoThruFour(data.data.slice(1, 4));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getBlogs();
  }, []);

  return (
    <div className="px-16 pb-16">
      <h4 className="font-bold mb-6">Recent Blog Posts</h4>
      {isLoading ? (
        <div className="w-full flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="w-full flex flex-col md:flex-row gap-6">
          {firstBlog && (
            <LeftRecentPosts
              id={firstBlog._id}
              title={firstBlog.title}
              author={firstBlog.author}
              content={firstBlog.content}
              date={firstBlog.date}
              tags={firstBlog.tags}
              img={firstBlog.img}
            />
          )}
          {blogsTwoThruFour && (
            <RightRecentPosts blogsArray={blogsTwoThruFour} />
          )}
        </div>
      )}
    </div>
  );
}

export default RecentBlogPosts;
