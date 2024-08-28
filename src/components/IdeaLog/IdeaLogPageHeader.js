import React from "react";

const IdeaLogPageHeader = () => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <h2 className="text-3xl font-medium font-antonio">Idea Logs</h2>
      <div
        className={` opacity-70 text-xs px-2 font-semibold py-1 border w-fit  rounded-full`}
      >
        Public Ideas
      </div>
    </div>
  );
};

export default IdeaLogPageHeader;
