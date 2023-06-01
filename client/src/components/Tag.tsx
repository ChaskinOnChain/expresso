import React from "react";
import { Link } from "react-router-dom";

type Props = {
  name: string;
};

const Tag = ({ name }: Props) => {
  return (
    <Link
      to={`/search/tag/?q=${name}`}
      className="border border-black rounded-xl px-2 cursor-pointer text-sm hover:bg-black hover:text-white transition duration-500"
    >
      {name}
    </Link>
  );
};

export default Tag;
