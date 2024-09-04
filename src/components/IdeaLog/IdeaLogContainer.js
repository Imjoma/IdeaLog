import { useSession } from "next-auth/react";

import IdeaTable from "@/components/IdeaLog/IdeaTable";
import { useState } from "react";
import SignInModal from "../SignInModal";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllIdeas,
  fetchIdeas,
  selectIdeasStatus,
} from "@/app/features/ideaLog/ideaLogSlice";

const IdeaLogContainer = () => {
  const [showForm, setShowForm] = useState(true);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();
  const ideaList = useSelector(selectAllIdeas);

  const ideaStatus = useSelector(selectIdeasStatus);

  const openModal = () => {
    document.body.classList.add("no-scroll");
    setModal(true);
  };

  const closeModal = () => {
    document.body.classList.remove("no-scroll");
    setModal(false);
  };

  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") return;
    dispatch(fetchIdeas());
  }, [status]);

  console.log(ideaList);
  console.log(ideaStatus);

  const LogInFullAccess = (
    <div
      className={` 
      w-full h-auto mt-[72px]  bg-slate-100 rounded-xl outline outline-slate-300 outline-1`}
    >
      <div className="flex items-center justify-center px-6 py-8">
        <button
          onClick={openModal}
          className={` 
          px-6 py-3 shadow-xl font-medium w-full md:w-fit bg-[#2392E2] rounded-xl text-white`}
          type="button"
        >
          Login to get Full Access!
        </button>
      </div>
    </div>
  );

  const isAuthenticated =
    status === "authenticated" ? (
      <>
        <div className="flex flex-col items-end justify-between w-full gap-4 lg:gap-0 md:flex-row">
          {/* searchbar*/}
          <div className="relative w-full h-12 lg:w-96">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="search"
              className="absolute w-full px-8 py-3 font-light border-none rounded-full outline-none focus:ring-2 bg-slate-100"
            />

            <button
              className="absolute w-4 h-4 bg-center bg-no-repeat bg-cover top-4 right-4 "
              style={{ backgroundImage: `url(assets/icons/close.svg)` }}
              type="button"
              onClick={() => setSearch("")}
            ></button>
          </div>
          {/* toggler */}
          <button
            className={`
    ${
      showForm
        ? "bg-transparent text-blue-500 ring-2  ring-blue-500"
        : "bg-[#2392E2] text-white"
    }
      px-6  py-3 w-fit text-nowrap rounded-full  font-semibold`}
            type="button"
            onClick={() => setShowForm((state) => !state)}
          >
            {showForm ? (
              <>Hide</>
            ) : (
              <>
                <span className="pr-2 ">+</span>
                New Idea
              </>
            )}
          </button>
        </div>

        {ideaStatus === "succeeded" && (
          <IdeaTable
            ideaList={ideaList}
            search={search}
            showForm={showForm}
            setShowForm={setShowForm}
          />
        )}
      </>
    ) : (
      LogInFullAccess
    );

  return (
    <div className="flex flex-col w-full py-0 pl-4 pr-4 space-y-6 lg:py-20 lg:pr-0 lg:pl-6 ">
      {/* Authentication Modal */}
      {modal && <SignInModal closeModal={closeModal} />}
      {isAuthenticated}
    </div>
  );
};

export default IdeaLogContainer;
