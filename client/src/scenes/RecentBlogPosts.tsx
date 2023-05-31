import React from "react";
import LeftRecentPosts from "./LeftRecentPosts";
import RightRecentPosts from "./RightRecentPosts";

function RecentBlogPosts() {
  return (
    <div className="px-16">
      <h4 className="font-bold mb-6">Recent Blog Posts</h4>
      <div className="w-full flex gap-6">
        <LeftRecentPosts />
        <RightRecentPosts />
      </div>
    </div>
  );
}

export default RecentBlogPosts;
