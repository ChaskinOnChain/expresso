import la from "../assets/images/la.jpg";
import Tag from "../components/Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

function LeftRecentPosts() {
  return (
    <div className="w-[50%]">
      <img className="cursor-pointer" src={la} alt="la" />
      <h4 className="pt-6 text-sm pb-2">John Smith - 20 Jan 2024</h4>
      <div className="flex justify-between cursor-pointer">
        <h2 className="font-bold mb-2">Title of the Blog</h2>
        <FontAwesomeIcon
          className="font-bold cursor-pointer"
          icon={faArrowUpRightFromSquare}
        />
      </div>
      <p className="mb-2">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut officia at
        unde adipisci ratione laudantium, inventore nesciunt obcaecati rem sunt.
      </p>
      <div className="flex gap-2">
        <Tag name={"tag1"} />
        <Tag name={"tag2"} />
        <Tag name={"tag3"} />
      </div>
    </div>
  );
}

export default LeftRecentPosts;
