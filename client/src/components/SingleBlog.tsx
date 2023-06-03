import { arrayBufferToBase64ImgSrc, convertDate } from "../utils/utils";
import { motion } from "framer-motion";
import Tag from "./Tag";
import { Link } from "react-router-dom";
import { SingleBlogProps } from "../types/types";

const SingleBlog = ({
  hoveredIndex,
  setHoveredIndex,
  img,
  title,
  date,
  index,
  tags,
  id,
}: SingleBlogProps) => {
  return (
    <Link
      to={`/discover/${id}`}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      className="h-[200px] w-full md:w-[48.86%] xl:w-[31%] rounded-xl overflow-hidden relative cursor-pointer"
    >
      <img
        className="w-full h-full"
        src={arrayBufferToBase64ImgSrc(img.data)}
        alt={title}
      />
      <motion.div
        className="absolute -bottom-[65px] px-4 left-0 h-28 w-full bg-gray-300/90 flex flex-col gap-2 justify-center items-center"
        animate={{ bottom: hoveredIndex === index ? 0 : "-65px" }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="font-bold">{title}</h3>
        <h4>{convertDate(date)}</h4>
        <div className="flex gap-1">
          {tags?.slice(0, 3).map((tag, index) => (
            <Tag key={index} name={tag} />
          ))}
        </div>
      </motion.div>
    </Link>
  );
};

export default SingleBlog;
