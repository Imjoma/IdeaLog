import React from "react";

const SkelonIdeaLog = () => {
  return (
    <div className="flex flex-col w-full py-0 pl-4 pr-4 space-y-6 lg:py-20 lg:pr-0 lg:pl-6 ">
      {/* searchbar */}
      <div className="flex flex-col items-end justify-between w-full gap-4 lg:gap-0 md:flex-row">
        <div className="relative w-full h-12 rounded-full animate-pulse bg-slate-200 lg:w-96"></div>
        <button className="w-24 h-12 rounded-full animate-pulse bg-slate-200 "></button>
      </div>
      {/* table */}
      <div className="w-full h-[500px]  bg-slate-100 rounded-xl "></div>
    </div>
  );
};

export default SkelonIdeaLog;
