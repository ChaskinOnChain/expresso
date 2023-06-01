import Tag from "../components/Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { arrayBufferToBase64ImgSrc, convertDate } from "../utils/utils";
import { LeftRecentProps } from "../types/types";
import { Link } from "react-router-dom";

function LeftRecentPosts({
  id,
  title,
  author,
  content,
  date,
  tags,
  img,
}: LeftRecentProps) {
  return (
    <div className="w-[50%]">
      <Link to={`/discover/${id}`}>
        <img
          className="cursor-pointer h-96 w-full"
          src={arrayBufferToBase64ImgSrc(img.data)}
          alt="la"
        />
      </Link>
      <h4 className="pt-6 text-sm pb-2">
        <Link to={`/profile/${author._id}`}>{author.username}</Link> -{" "}
        {convertDate(date)}
      </h4>

      <Link
        className="flex justify-between cursor-pointer"
        to={`/discover/${id}`}
      >
        <h2 className="font-bold mb-2">{title}</h2>
        <FontAwesomeIcon
          className="font-bold cursor-pointer"
          icon={faArrowUpRightFromSquare}
        />
      </Link>

      <p className="mb-2">{`${content.slice(0, 130)}...`}</p>
      <div className="flex gap-2">
        <Tag name={tags[0]} />
        <Tag name={tags[1]} />
        <Tag name={tags[2]} />
      </div>
    </div>
  );
}

export default LeftRecentPosts;
