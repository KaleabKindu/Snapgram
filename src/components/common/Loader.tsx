import React from "react";
import { ClipLoader } from "react-spinners";

type Props = {};

const Loader = (props: Props) => {
  return (
    <div className="flex flex-center w-full mt-5 md:mt-10">
      <ClipLoader size={50} />
    </div>
  );
};

export default Loader;
