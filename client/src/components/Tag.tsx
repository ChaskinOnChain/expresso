import React from "react";

type Props = {
  name: string;
};

const Tag = ({ name }: Props) => {
  return (
    <div className="border border-black rounded-xl px-2 cursor-pointer text-sm">
      {name}
    </div>
  );
};

export default Tag;
