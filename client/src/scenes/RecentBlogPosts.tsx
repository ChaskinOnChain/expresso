import { useEffect, useState } from "react";
import LeftRecentPosts from "./LeftRecentPosts";
import RightRecentPosts from "./RightRecentPosts";
import axios from "axios";
import { useSelector } from "react-redux";
import { BlogReturn } from "../types/types";

const API_URL = "http://localhost:3000/blogs/all";

function RecentBlogPosts() {
  const token = useSelector((state) => state.app.user.token);
  const [firstBlog, setFirstBlog] = useState<BlogReturn | null>(null);
  const [blogsTwoThruFour, setBlogsTwoThruFour] = useState<BlogReturn[] | null>(
    null
  );
  useEffect(() => {
    async function getBlogs() {
      try {
        const res = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        setFirstBlog(data.data.docs[0]);
        setBlogsTwoThruFour(data.data.docs.slice(1, 4));
      } catch (error) {
        console.log(error);
      }
    }
    getBlogs();
  }, []);

  return (
    <div className="px-16">
      <h4 className="font-bold mb-6">Recent Blog Posts</h4>
      <div className="w-full flex gap-6">
        {firstBlog && (
          <LeftRecentPosts
            title={firstBlog.title}
            author={firstBlog.author}
            content={firstBlog.content}
            date={firstBlog.date}
            tags={firstBlog.tags}
            img={firstBlog.img}
          />
        )}
        {blogsTwoThruFour && <RightRecentPosts blogsArray={blogsTwoThruFour} />}
      </div>
    </div>
  );
}

export default RecentBlogPosts;
