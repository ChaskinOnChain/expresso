import NFT from "../components/NFT";
import NavbarDiscover from "../components/NavbarDiscover";
import RecentBlogPosts from "./RecentBlogPosts";

function Discover() {
  return (
    <div className="flex flex-col flex-grow max-w-[90rem] mx-auto xl:mx-auto p-8">
      <NavbarDiscover />
      <div className="px-16 pt-8 pb-4 text-center">
        <h1 className="text-5xl font-bold tracking-wider mb-4 text-gray-900">
          Explore New Horizons, One Post at a Time
        </h1>
        <h4 className="text-lg text-gray-600 mb-4">
          Dive into the latest posts, unveiling stories, insights, and
          inspirations from the corners of our shared world.{" "}
        </h4>
      </div>
      <RecentBlogPosts />
      <NFT />
    </div>
  );
}

export default Discover;
