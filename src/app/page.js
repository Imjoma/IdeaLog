"use client";

import { useState, useEffect } from "react";
import TodoAndTimer from "@/components/TodowithTimer/TodoAndTimer";
import { Provider } from "react-redux";
import { store } from "./store";
import SkeletonTodoContainer from "@/components/SkeletonUI/SkeletonTodoContainer";
import IdeaLogContainer from "@/components/IdeaLog/IdeaLogContainer";
import SkelonIdeaLog from "@/components/SkeletonUI/SkelonIdeaLog";

export default function Home() {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (mount) return;
    setMount(true);
  }, [mount]);

  return (
    <main className="flex flex-col max-w-screen-xl mx-auto lg:flex-row">
      {mount ? (
        <Provider store={store}>
          <IdeaLogContainer />
          <TodoAndTimer />
        </Provider>
      ) : (
        <>
          <SkelonIdeaLog />
          <SkeletonTodoContainer />
        </>
      )}
    </main>
  );
}
