import React from "react";

type Props = {
  message?: string;
};

const NoPosts = ({ message = "No Posts" }: Props) => {
  return (
    <div className="flex flex-center w-full text-center text-light-3 mt-5 md:mt-10">
      {message}
    </div>
  );
};

export default NoPosts;
