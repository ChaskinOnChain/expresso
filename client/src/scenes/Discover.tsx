import Footer from "../components/Footer";
import NavbarDiscover from "../components/NavbarDiscover";
import RecentBlogPosts from "./RecentBlogPosts";

function Discover() {
  return (
    <div className="flex flex-col flex-grow max-w-[90rem] xl:mx-auto">
      <NavbarDiscover />
      <div className="px-16 pt-8 pb-10 text-center">
        <h1 className="text-5xl font-bold tracking-wider mb-8">
          Explore New Horizons, One Post at a Time
        </h1>
        <h4 className="text-lg">
          Dive into the latest posts, unveiling stories, insights, and
          inspirations from the corners of our shared world.
        </h4>
      </div>
      <RecentBlogPosts />
    </div>
  );
}

export default Discover;
