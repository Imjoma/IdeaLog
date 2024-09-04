import IdeaLogPageHeader from "@/components/IdeaLog/IdeaLogPageHeader";
import PublicIdeaItem from "@/components/IdeaLog/PublicIdeaItem";
import { BASE_API_URL } from "@/utils/constant";

export const getData = async () => {
  const res = await fetch(`${BASE_API_URL}/api/ideasPublic`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
};

const IdeaLogPage = async () => {
  const data = await getData();

  return (
    <main className="flex flex-col max-w-screen-xl mx-auto lg:flex-row">
      <div className="flex flex-col w-full px-6 py-6 space-y-6">
        <IdeaLogPageHeader />

        <div className="w-full h-auto p-6 space-y-6 bg-slate-100 rounded-xl outline outline-slate-300 outline-1">
          {data.map((item, idx) => (
            <PublicIdeaItem item={item} key={item._id} />
          ))}
        </div>

        {/* NewIdea */}
      </div>
    </main>
  );
};

export default IdeaLogPage;
