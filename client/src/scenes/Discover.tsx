import NavbarDiscover from "../components/NavbarDiscover";
import RecentBlogPosts from "./RecentBlogPosts";

function Discover() {
  return (
    <div>
      <NavbarDiscover />
      <div className="py-16 text-center">
        <h1 className="text-5xl font-bold tracking-wider mb-8">
          Inside Design: Stories and interviews
        </h1>
        <h4 className="text-lg">
          Subscripte to learn about new product features, the latest in
          technology, and updates
        </h4>
      </div>
      <RecentBlogPosts />
    </div>
  );
}

export default Discover;
