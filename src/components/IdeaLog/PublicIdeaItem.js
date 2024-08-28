import Link from "next/link";

import { Antonio } from "next/font/google";
import BlogDateFormat from "@/helpers/BlogDateFormat";
const antonio = Antonio({ subsets: ["latin"] });

const PublicIdeaItem = ({ item }) => {
  const itemDate = BlogDateFormat(item.createdAt.split("T")[0]);
  return (
    <div
      className="relative flex flex-col space-y-3 sm:space-y-0 sm:space-x-5 sm:flex-row"
      key={item._id}
    >
      {/* LEFT */}
      <div className="w-full h-auto overflow-hidden bg-black aspect-video rounded-xl sm:w-80">
        {item.image && (
          <img
            src={`data:image/png;base64,${item.image}`}
            alt={item.title}
            className="object-cover w-full h-full"
          />
        )}
      </div>

      {/* RIGHT */}
      <div className="flex flex-col justify-between w-full pr-2 space-y-2">
        <div>
          {/* title */}
          <div
            className={
              antonio.className +
              " text-xl hover:underline truncate w-full sm:w-64 md:w-full lg:w-[10rem] xl:w-full"
            }
          >
            <Link href={`/idea-log/${item._id}`}>{item.title}</Link>
          </div>
          {/* description */}
          <p className="inline-block w-full sm:w-64 md:w-full truncate-2-lines">
            {item.description}
          </p>
        </div>

        {/* Lower */}
        <div className="flex flex-row items-center justify-between pt-1">
          {/* user and visibility */}
          <div className="flex flex-row space-x-2">
            <>
              <img
                className="w-6 h-6 rounded-full"
                src={item.userImage}
                alt={item.username + " profile picture"}
              />
              <span>•</span>
              <p className="font-medium ">{item.username}</p>
            </>
          </div>
          {/* date */}
          <p className="text-sm font-medium opacity-60">{itemDate}</p>
        </div>
      </div>
    </div>
  );
};

export default PublicIdeaItem;
