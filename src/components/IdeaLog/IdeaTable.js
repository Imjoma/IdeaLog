"use client";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import IdeaForm from "@/components/IdeaLog/IdeaForm";
import IdeaItem from "@/components/IdeaLog/IdeaItem";

import {
  updateIdea,
  fetchIdeas,
  selectAllIdeas,
  selectIdeasStatus,
  selectIdeasUpdated,
} from "@/app/features/ideaLog/ideaLogSlice";

const IdeaTable = ({ showForm, setShowForm, search, ideaList }) => {
  const dispatch = useDispatch();
  // const ideaList = useSelector(selectAllIdeas);
  const ideaStatus = useSelector(selectIdeasStatus);
  const { status, data } = useSession();
  const pathname = usePathname();

  const originalPost = ideaList
    ? ideaList?.filter((idea) => idea.username === data?.user.name)
    : [];

  const ideaListOnSearch =
    search === "" || search.trim().length === 0
      ? originalPost
      : originalPost.filter((idea) => idea.title.includes(search));

  const [editIdea, setEditIdea] = useState(null);

  const isIdle = ideaStatus === "idle";
  // const isEmpty = originalPost.length === 0 || !originalPost;

  // useEffect(() => {
  //   dispatch(fetchIdeas());
  // }, []);

  const handleUpdate = async (updatedIdea) => {
    const { _id } = editIdea;
    const { image, title, description, visibility } = updatedIdea;
    try {
      const res = await fetch(`/api/ideas/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image,
          title,
          description,
          visibility,
        }),
      });
      const updatedData = await res.json();
      dispatch(updateIdea({ id: _id, updatedData }));
    } catch (err) {
      console.log(err);
    }
  };

  // UI 💅

  const isFirst =
    pathname === "/" &&
    status === "authenticated" &&
    ideaList === 0 &&
    !showForm;
  const CreateFirstIdea = (
    <div className="flex items-center justify-center w-full px-6 py-8 h-fit ">
      <button
        className={`
         bg-[#2392E2] text-white 
        px-6 py-3 w-fit text-nowrap rounded-xl shadow-xl  font-semibold`}
        type="button"
        onClick={() => setShowForm(true)}
      >
        Create your first Idea
      </button>
    </div>
  );

  return (
    <div
      className={` 
    w-full h-auto  bg-slate-100 rounded-xl outline outline-slate-300 outline-1`}
    >
      {ideaStatus !== "succeeded" && (
        <div className="flex items-center justify-center px-6 py-8">
          <div className="p-2 border bg-slate-500 rounded-xl bg-opacity-30">
            <div
              className="w-8 h-8 bg-no-repeat bg-cover rounded-xl"
              style={{
                backgroundImage: `url(assets/icons/loading.svg)`,
              }}
            ></div>
          </div>
        </div>
      )}

      {isFirst && CreateFirstIdea}

      {/* {pathname === "/" && status === "unauthenticated" && LogInFullAccess} */}

      {/* Home Page and Authenticated */}
      {ideaStatus === "succeeded" && status === "authenticated" && (
        <div
          className={`
           ${ideaListOnSearch.length === 0 ? "p-0" : "p-6"}
         space-y-6 rounded-xl duration-200`}
        >
          {/* form */}
          {showForm && (
            <IdeaForm
              setShowForm={setShowForm}
              setEditIdea={setEditIdea}
              handleUpdate={handleUpdate}
              editIdea={editIdea}
            />
          )}

          {/* idea list */}
          {/* {isLoading && <div>loading...</div>} */}
          {isIdle || !ideaList ? (
            <button
              onClick={() => dispatch(fetchIdeas())}
              className={` 
                    px-6 py-3 shadow-xl font-medium w-full md:w-fit bg-blue-500 rounded-full text-white`}
              type="button"
            >
              Fetch Data
            </button>
          ) : (
            ideaListOnSearch?.map((item) => (
              <IdeaItem
                setShowForm={setShowForm}
                handleUpdate={handleUpdate}
                setEditIdea={setEditIdea}
                item={item}
                key={item._id}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default IdeaTable;
