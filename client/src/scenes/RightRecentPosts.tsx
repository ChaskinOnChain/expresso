import la from "../assets/images/la.jpg";
import Tag from "../components/Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

function RightRecentPosts() {
  return (
    <div className="w-[50%]">
      <div className="flex gap-4 mb-4">
        <div className="w-[49%]">
          <img src={la} alt="la" />
        </div>
        <div className="w-[49%]">
          <h4 className="text-sm pb-2">John Smith - 20 Jan 2024</h4>
          <div className="flex justify-between">
            <h2 className="font-bold mb-2 cursor-pointer">Title of the Blog</h2>
            <FontAwesomeIcon
              className="font-bold cursor-pointer"
              icon={faArrowUpRightFromSquare}
            />
          </div>
          <p className="mb-2">Lorem ipsum, dolor sit amet consectetur...</p>
          <div className="flex gap-2">
            <Tag name={"tag1"} />
            <Tag name={"tag2"} />
            <Tag name={"tag3"} />
          </div>
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <div className="w-[49%]">
          <img src={la} alt="la" />
        </div>
        <div className="w-[49%]">
          <h4 className="text-sm pb-2">John Smith - 20 Jan 2024</h4>
          <div className="flex justify-between">
            <h2 className="font-bold mb-2 cursor-pointer">Title of the Blog</h2>
            <FontAwesomeIcon
              className="font-bold cursor-pointer"
              icon={faArrowUpRightFromSquare}
            />
          </div>
          <p className="mb-2">Lorem ipsum, dolor sit amet consectetur...</p>
          <div className="flex gap-2">
            <Tag name={"tag1"} />
            <Tag name={"tag2"} />
            <Tag name={"tag3"} />
          </div>
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <div className="w-[49%]">
          <img src={la} alt="la" />
        </div>
        <div className="w-[49%]">
          <h4 className="text-sm pb-2">John Smith - 20 Jan 2024</h4>
          <div className="flex justify-between">
            <h2 className="font-bold mb-2 cursor-pointer">Title of the Blog</h2>
            <FontAwesomeIcon
              className="font-bold cursor-pointer"
              icon={faArrowUpRightFromSquare}
            />
          </div>
          <p className="mb-2">Lorem ipsum, dolor sit amet consectetur...</p>
          <div className="flex gap-2">
            <Tag name={"tag1"} />
            <Tag name={"tag2"} />
            <Tag name={"tag3"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightRecentPosts;
