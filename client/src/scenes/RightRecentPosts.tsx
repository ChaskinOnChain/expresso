import Tag from "../components/Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { BlogReturn } from "../types/types";
import { arrayBufferToBase64ImgSrc, convertDate } from "../utils/utils";

arrayBufferToBase64ImgSrc;
function RightRecentPosts({ blogsArray }: { blogsArray: BlogReturn[] }) {
  return (
    <div className="w-[50%]">
      {blogsArray.map((blog, index) => {
        return (
          <div key={index} className="flex gap-4 mb-4">
            <div className="w-[49%]">
              <img
                className="h-32 w-full"
                src={arrayBufferToBase64ImgSrc(blog.img.data)}
                alt={blog.title}
              />
            </div>
            <div className="w-[49%]">
              <h4 className="text-sm pb-2">
                {blog.author.username} - {convertDate(blog.date)}
              </h4>
              <div className="flex justify-between">
                <h2 className="font-bold mb-2 cursor-pointer">{blog.title}</h2>
                <FontAwesomeIcon
                  className="font-bold cursor-pointer"
                  icon={faArrowUpRightFromSquare}
                />
              </div>
              <p className="mb-2">{blog.content.slice(0, 40)}...</p>
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
