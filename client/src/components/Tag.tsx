import React from "react";

type Props = {
  name: string;
};

const Tag = ({ name }: Props) => {
  return (
    <div className="border border-black rounded-xl px-2 cursor-pointer text-sm hover:bg-black hover:text-white transition duration-500">
      {name}
    </div>
  );
};

export default Tag;
